import { useNow } from '@/modules/utils/useNow';
import { postSmoking } from './smoke.api';
// import { useSignal, useComputed, type Signal } from '@preact/signals-react';
import { type Smoking } from './Smoking.model';
import { dateStamp, timeStamp } from '@/helpers/date';
import { useMemo, useState } from 'react';

type UseSmokeProps = {
  interval: number;
  smoking: Smoking;
};

export const useSmoke = (props: UseSmokeProps) => {
  const { now } = useNow();
  // const isLoading = useSignal(false);
  const [isLoading, setIsLoading] = useState(false);
  const [smoking, setSmoking] = useState<Smoking>(props.smoking);
  // const smoking: Signal<Smoking> = useSignal(props.smoking);

  const smoked = useMemo(() => smoking.count, [smoking.count]);
  // const smoked = useComputed(() => smoking.value?.count ?? 0);

  const lastSmoked = useMemo(
    () => (smoking.lastSmkdStamp ? timeStamp(smoking.lastSmkdStamp) : 0),
    [smoking.lastSmkdStamp],
  );
  // const lastSmoked = useComputed(() =>
  //   smoking.value?.lastSmkdStamp ? timeStamp(smoking.value.lastSmkdStamp) : 0,
  // );
  const intervalMs = props.interval * 60 * 1000;
  const elapsed = useMemo(() => now - lastSmoked * 1000, [now, lastSmoked]);
  // const elapsed = useComputed(() => now.value - lastSmoked.value * 1000);
  const leftSeconds = useMemo(
    () => Math.floor(Math.max(intervalMs - elapsed, 0) / 1000),
    [intervalMs, elapsed],
  );
  // const leftSeconds = useComputed(() =>
  //   Math.floor(Math.max(intervalMs - elapsed.value, 0) / 1000),
  // );
  const leftMinutes = useMemo(
    () => Math.min(Math.ceil(leftSeconds / 60), intervalMs),
    [leftSeconds, intervalMs],
  );
  // const leftMinutes = useComputed(() =>
  //   Math.min(Math.ceil(leftSeconds.value / 60), intervalMs),
  // );
  const progress = useMemo(
    () => Math.min(elapsed / intervalMs, 1),
    [elapsed, intervalMs],
  );
  // const progress = useComputed(() => Math.min(elapsed.value / intervalMs, 1));
  console.log(progress);
  const text = useMemo(
    () => (leftSeconds < 60 ? `${leftSeconds}s` : `${leftMinutes}m`),
    [leftSeconds, leftMinutes],
  );
  // const text = useComputed(() =>
  //   leftSeconds.value < 60 ? `${leftSeconds}s` : `${leftMinutes}m`,
  // );

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
      // smoking.value = data;
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
