// mixture of
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/,
// https://github.com/helloswyg/corre/blob/aedc73a0dd786924c1742db947a10c93f4e90ed0/src/timeout/timeout.hook.ts
// and https://stackoverflow.com/questions/56262515/how-to-handle-dependencies-array-for-custom-hooks-in-react
import { useEffect, useRef } from 'react';

function useTimeout(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // call timeout only when delay or callback changes
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setTimeout(tick, delay*1000);
      return () => clearTimeout(id);
    }
  }, [delay, callback]);
};

export default useTimeout;
