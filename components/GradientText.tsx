import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

export type Props = {
  start: string;
  end: string;
  className?: string;
};

export const GradientText: FunctionComponent<PropsWithChildren & Props> = (
  props,
) => {
  const style = {
    backgroundImage: `linear-gradient(90deg,${props.start},${props.end})`,
  };
  return (
    <span
      className={clsx('bg-clip-text animate-textEmergence', props.className)}
      style={style}
    >
      {props.children}
    </span>
  );
};
