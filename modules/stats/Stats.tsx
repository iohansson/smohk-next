'use client';

import { useRef, type FunctionComponent, useEffect } from 'react';
import { Chart } from './Chart';
import { Smoking } from '../smoke/Smoking.model';
import { humanDate } from '@/helpers/date';

export const Stats: FunctionComponent<{ stats: Smoking[] }> = ({ stats }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const chart = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: stats.map((s) => humanDate(s.dateStamp)),
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
