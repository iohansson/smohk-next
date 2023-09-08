import type { FunctionComponent } from 'react';
import defu from 'defu';
import clsx from 'clsx';
import { Button } from './Button';

export type ProgressProps = {
  size?: number;
  stroke?: number;
  progress?: number;
  text?: string;
  className?: string;
  onClick(): void;
};

const defaults: { size: number; stroke: number; progress: number } = {
  size: 64,
  stroke: 2,
  progress: 0,
};

export const Progress: FunctionComponent<ProgressProps> = (props) => {
  const { size, stroke, progress, text, className, onClick } = defu(
    props,
    defaults,
  );

  const r = size / 2 - stroke;
  const centerX = size / 2;
  const centerY = size / 2;
  const c = 2 * Math.PI * r;
  const lProgress = c * progress;

  const isReady = progress === 1;

  return (
    <div className={clsx('relative', className)}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className={'stroke-[#ffffff11] absolute top-0 left-0'}
      >
        <circle
          cx={centerX}
          cy={centerY}
          r={r}
          fill="none"
          strokeWidth={stroke}
        />
      </svg>
      <svg viewBox={`0 0 ${size} ${size}`} className={'stroke-current'}>
        <circle
          cx={centerX}
          cy={centerY}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeDashoffset={c / 4}
          strokeDasharray={`${lProgress} ${c - lProgress}`}
        />
      </svg>
      {text && !isReady ? (
        <span className="absolute top-1/2 left-1/2 text-3xl -translate-x-1/2 -translate-y-1/2 text-current font-black">
          {text}
        </span>
      ) : null}
      {/* so, this circle will appear when the timer reaches 0
       * and on click it will animate out and show the timer again
       */}
      {isReady ? (
        <Button className="block absolute inset-0 opacity-0" onOut={onClick}>
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className={'fill-current text-orange'}
          >
            <circle cx={centerX} cy={centerY} r={r - stroke / 2} />
          </svg>
        </Button>
      ) : null}
    </div>
  );
};
