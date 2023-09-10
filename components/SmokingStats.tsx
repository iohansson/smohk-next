'use client';

import { useMoney } from '@/modules/smoke/useMoney';
import { type Config } from '@/modules/config/Config.model';
import { type Smoking } from '@/modules/smoke/Smoking.model';
import { humanDatetime } from '@/helpers/date';

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
    <div className="stats">
      <div className="stat">
        <div className="stat-title">Smoked</div>
        <div className="stat-value">{smoking.count}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Spent</div>
        <div className="stat-value">{today}</div>
        <div className="stat-desc">Projected: {monthly}</div>
      </div>
      {smoking.lastSmkdStamp && (
        <div className="stat">
          <div className="stat-title">Last</div>
          <div className="stat-value">
            {humanDatetime(smoking.lastSmkdStamp)}
          </div>
        </div>
      )}
    </div>
  );
}
