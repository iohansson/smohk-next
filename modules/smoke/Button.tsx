import { type FunctionComponent, type PropsWithChildren, useRef } from 'react';
import {
  useAnimate,
  type AnimationPlaybackControls,
  type Segment,
  AnimationScope,
} from 'framer-motion';

export type ButtonProps = {
  onOut?(): void;
  className?: string;
};

const getSequence = (scope: AnimationScope<any>) => {
  const seq: Segment[] = [
    [
      scope.current,
      { opacity: [0, 1] },
      { duration: 0.8, ease: 'easeIn', autoplay: false },
    ],
    [
      scope.current,
      { opacity: [1, 0] },
      { delay: 1, duration: 0.6, ease: 'easeIn', autoplay: false },
    ],
  ];
  return seq;
};

export const Button: FunctionComponent<PropsWithChildren & ButtonProps> = (
  props: any,
) => {
  const [scope, animate] = useAnimate();
  const animation = useRef<AnimationPlaybackControls | null>(null);

  const runAnimation = () => {
    if (!scope.current) return;
    if (animation.current) {
      animation.current.stop();
      animation.current = null;
    }
    animation.current = animate(getSequence(scope));
    animation.current.then(() => props.onOut?.());
  };

  return (
    <button ref={scope} onClick={runAnimation} className={props.className}>
      {props.children}
    </button>
  );
};
