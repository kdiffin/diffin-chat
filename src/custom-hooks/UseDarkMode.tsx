import React, { useEffect, useState } from "react";

function UseDarkMode() {
  //false is darkMode true is lightMode
  const [theme, setTheme] = useState(true);

  // useEffect(() => {
  //   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //     setTheme(false);
  //   } else {
  //     setTheme(true);
  //   }
  // }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function changeTheme() {
    setTheme((oldTheme) => !oldTheme);
  }

  return [theme, changeTheme];
}

export default UseDarkMode;
