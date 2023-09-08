'use client';

import { useEffect, useRef, useState } from 'react';
// import { signal, type Signal } from '@preact/signals-react';

export const useNow = () => {
  const [now, setNow] = useState(Date.now().valueOf());
  // const now: Signal<number> = signal(Date.now().valueOf());
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setNow(Date.now().valueOf());
      // now.value = Date.now().valueOf();
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [intervalRef]);

  return { now };
};
