import dayjs from 'dayjs';
import defu from 'defu';

export type MonyProps = {
  price: number;
  quantity: number;
  smkd: number;
  currency?: string;
};

const defaults = {
  quantity: 20,
  currency: '€',
};

export const useMoney = (props: MonyProps) => {
  const { price, quantity, smkd, currency } = defu(props, defaults);
  const today = (price / quantity) * smkd;
  const monthly = today * dayjs().daysInMonth();

  return {
    today: `${today.toFixed(2)}${currency}`,
    monthly: `${monthly.toFixed(2)}${currency}`,
  };
};
