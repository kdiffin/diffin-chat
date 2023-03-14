import React from "react";
import { matchPath, useLocation } from "react-router-dom";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  //https://mui.com/material-ui/guides/routing/#tabs heres the docs
  //contorl the users navigations by using this hook

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];

    const possibleMatch = matchPath(pattern, pathname);

    // the %20 gets converted into a space, i wrote some comments and code about this in users.tsx
    // basically make a function which maps over the array and then replaces the " " with %20
    // arr.map((item: string) => item.replace(" ", %20))

    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export default useRouteMatch;
