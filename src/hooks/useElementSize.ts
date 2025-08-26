import { useState, useLayoutEffect, RefObject } from 'react';

export function useElementSize(ref: RefObject<HTMLElement>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const element = ref.current;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!element) {
      return;
    }

    const updateSize = () => {
      setSize({
        width: element.offsetWidth,
        height: element.offsetHeight,
      });
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(element);
    updateSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return size;
}
