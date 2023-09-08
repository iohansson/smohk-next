'use client';

import { useRef, type FunctionComponent, useEffect } from 'react';
import { Chart } from './Chart';
import { SmokingDocument } from '../smoke/Smoking.model';

export const Stats: FunctionComponent<{ stats: SmokingDocument[] }> = ({
  stats,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const chart = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: stats.map((s) => s.dateStamp),
        datasets: [
          {
            label: 'Smoked',
            data: stats.map((s) => s.count),
          },
        ],
      },
    });
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [ref.current]);

  return <canvas ref={ref}></canvas>;
};
