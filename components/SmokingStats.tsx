'use client';

import { useMoney } from '@/modules/smoke/useMoney';
import { type Config } from '@/modules/config/Config.model';
import { type Smoking } from '@/modules/smoke/Smoking.model';
import { humanDate, humanDatetime } from '@/helpers/date';

type SmokingStatsProps = {
  config: Config;
  smoking: Smoking;
};

export function SmokingStats(props: SmokingStatsProps) {
  const { packAmount, packPrice } = props.config;
  const { smoking } = props;

  const { today, monthly } = useMoney({
    price: packPrice,
    quantity: packAmount,
    smkd: smoking.count,
  });

  return (
    <div className="py-4 space-y-2">
      <p>smohked: {smoking.count}</p>
      <p>day: {humanDate(smoking.dateStamp)}</p>
      {smoking.lastSmkdStamp && (
        <p>last: {humanDatetime(smoking.lastSmkdStamp)}</p>
      )}
      <p>
        spent today: {today}, projection: {monthly}
      </p>
    </div>
  );
}
