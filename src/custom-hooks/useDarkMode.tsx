import React, { useEffect, useState } from "react";

function useDarkMode() {
  //false is lightMode true is darkMode
  const [theme, setTheme] = useState(true);

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

export default useDarkMode;
