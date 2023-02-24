import React, { useEffect } from "react";

function useHandleShortcut(props: {
  userAction: string | number;
  actionFunction: VoidFunction;
  useCtrlKey?: boolean;
  useEffectDependency?: any;
}) {
  //my own custom user shortcut handling function :)

  const keydownHandler = (e: { key: string; ctrlKey: any }) => {
    if (props.useCtrlKey) {
      if (e.key === props.userAction && e.ctrlKey) props.actionFunction();
      return;
    }

    if (e.key === props.userAction) props.actionFunction();
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [props.useEffectDependency]);

  return [];
}

export default useHandleShortcut;
