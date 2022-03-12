import type { MutableRefObject } from "react";
import { useEffect, useRef, useCallback } from "react";

/**
 *  useOutsideClick hook
 * Checks if a click happened outside a Ref. Handy for dropdowns, modals and popups etc.
 *
 * @param ref Ref whose outside click needs to be listened to
 * @param handler Callback to fire on outside click
 */
export const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: (e: MouseEvent) => any,
) => {
  const savedHandler = useRef(handler);

  const memoizedCallback = useCallback((e: MouseEvent) => {
    if (ref && ref.current && !ref.current.contains(e.target as Element)) {
      savedHandler.current(e);
    }
  }, []);

  useEffect(() => {
    savedHandler.current = handler;
  });

  useEffect(() => {
    document.addEventListener("click", memoizedCallback, true);

    return () => {
      document.removeEventListener("click", memoizedCallback, true);
    };
  }, [ref, handler]);
}
