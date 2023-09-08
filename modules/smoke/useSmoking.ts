import { useNow } from '@/modules/utils/useNow';
import { postSmoking } from './smoke.api';
import { type Smoking } from './Smoking.model';
import { dateStamp, timeStamp } from '@/helpers/date';
import { useMemo, useState } from 'react';

type UseSmokingProps = {
  interval: number;
  initial: Smoking;
};

export const useSmoking = (props: UseSmokingProps) => {
  const { now } = useNow();
  const [isLoading, setIsLoading] = useState(false);
  const [smoking, setSmoking] = useState<Smoking>(props.initial);

  const smoked = useMemo(() => smoking.count, [smoking.count]);

  const lastSmoked = useMemo(
    () => (smoking.lastSmkdStamp ? timeStamp(smoking.lastSmkdStamp) : 0),
    [smoking],
  );

  const intervalMs = props.interval * 60 * 1000;
  const elapsed = useMemo(() => now - lastSmoked * 1000, [now, lastSmoked]);

  const leftSeconds = useMemo(
    () => Math.floor(Math.max(intervalMs - elapsed, 0) / 1000),
    [intervalMs, elapsed],
  );

  const leftMinutes = useMemo(
    () => Math.min(Math.ceil(leftSeconds / 60), intervalMs),
    [leftSeconds, intervalMs],
  );

  const progress = useMemo(
    () => Math.min(elapsed / intervalMs, 1),
    [elapsed, intervalMs],
  );

  const text = useMemo(
    () => (leftSeconds < 60 ? `${leftSeconds}s` : `${leftMinutes}m`),
    [leftSeconds, leftMinutes],
  );

  const smoke = () => {
    if (progress < 1) {
      return;
    }
    const newData = {
      ...smoking,
      dateStamp: dateStamp(),
      count: smoked + 1,
      lastSmkdStamp: timeStamp(),
    };
    postSmoking(newData).then((data) => {
      setSmoking(data);
    });
  };

  return {
    smoke,
    progress,
    text,
    smoked,
    smoking,
    lastSmoked,
    isLoading,
  };
};
