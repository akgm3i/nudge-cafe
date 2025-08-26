import { useState, useLayoutEffect, RefObject } from 'react';

export function useElementSize(ref: RefObject<HTMLElement>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const element = ref.current;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      setSize({
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    });

    resizeObserver.observe(element);

    // Set initial size
    setSize({
      width: element.offsetWidth,
      height: element.offsetHeight,
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return size;
}
