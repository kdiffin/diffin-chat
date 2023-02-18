import React from "react";
import { matchPath, useLocation } from "react-router-dom";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  //https://mui.com/material-ui/guides/routing/#tabs heres the docs
  //contorl the users navigations by using this hook

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    //sadly this dont work if ur user got a space inbetween his name
    // the %20 gets converted into a space, i can deal with this later if i want to
    // console.log(possibleMatch);

    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export default useRouteMatch;
