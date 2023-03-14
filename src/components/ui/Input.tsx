import React, { Dispatch } from "react";

function Input(props: {
  placeholder: string;
  type: string;
  value: string | undefined;
  onChange: Dispatch<React.SetStateAction<string>> | Function;
  className?: string;
  defaultValue?: string;
  name?: string;
  id?: string;
  customFunction?: boolean;
}) {
  return (
    <div
      className={
        props.className +
        " chatInput__background w-full rounded-md   bg-zinc-300 p-1 dark:bg-zinc-700 md:p-2 "
      }
    >
      <input
        value={props.value}
        type={props.type}
        onChange={
          props.customFunction
            ? (e: any) => props.onChange(e)
            : (e) => props.onChange(e.target.value)
        }
        autoComplete="off"
        id={props.id}
        defaultValue={props.defaultValue}
        spellCheck="false"
        name={props.name}
        placeholder={props.placeholder}
        className="w-full border-none bg-transparent outline-none placeholder:text-sm placeholder:italic"
      />
    </div>
  );
}
export default Input;
