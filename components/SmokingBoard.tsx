'use client';

import dynamic from 'next/dynamic';
import { useSmoking } from '@/modules/smoke/useSmoking';
import { type Config } from '@/modules/config/Config.model';
import { type Smoking } from '@/modules/smoke/Smoking.model';
import { SmokingStats } from '@/components/SmokingStats';

type Smoker = {
  email: string;
};
type Props = {
  smoker: Smoker;
  config: Config;
  smoking: Smoking;
};

const Progress = dynamic(
  () => import('@/modules/smoke/Progress').then((mod) => mod.Progress),
  { ssr: false },
);

export function SmokingBoard(props: Props) {
  const { config } = props;
  const { smoke, progress, text, isLoading, smoking } = useSmoking({
    interval: config.interval,
    initial: props.smoking,
  });

  return isLoading ? (
    'loading...'
  ) : (
    <>
      <SmokingStats config={config} smoking={smoking} />
      <Progress
        size={32}
        progress={progress}
        text={text}
        className="mx-auto mt-4 w-80"
        onClick={smoke}
      />
    </>
  );
}
