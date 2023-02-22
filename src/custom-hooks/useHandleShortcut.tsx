import React, { useEffect } from "react";

function useHandleShortcut(props: {
  userAction: string;
  actionFunction: VoidFunction;
}) {
  const keydownHandler = (e: { key: string; ctrlKey: any }) => {
    if (e.key === props.userAction && e.ctrlKey) props.actionFunction();
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  return [];
}

export default useHandleShortcut;
