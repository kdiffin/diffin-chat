import React, { RefObject, useEffect, useRef, useState } from "react";

function useDetectSticky(
  ref?: RefObject<any>,
  observerSettings = { threshold: [1] }
): [boolean, RefObject<any>, React.Dispatch<React.SetStateAction<boolean>>] {
  // the stack overflow post for this hook
  // console log and figure out how this works later
  // https://stackoverflow.com/questions/16302483/event-to-detect-when-positionsticky-is-triggered

  const [isSticky, setIsSticky] = useState(false);
  const newRef = useRef();
  ref ||= newRef;

  // mount
  useEffect(() => {
    const cachedRef = ref?.current,
      observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        observerSettings
      );

    observer.observe(cachedRef);

    // unmount
    return () => {
      observer.unobserve(cachedRef);
    };
  }, []);

  return [isSticky, ref, setIsSticky];
}

export default useDetectSticky;
