import '@/helpers/db';
import { SmokingModel } from '@/modules/smoke/Smoking.model';
import dayjs from 'dayjs';

export const findStats = async ({
  smoker,
  dateStamp,
}: {
  smoker: string;
  dateStamp: number;
}) => {
  const start = dayjs.unix(dateStamp).subtract(30, 'days').unix();
  return SmokingModel.find({ smoker, dateStamp: { $gte: start } }).select(
    '-_id -__v',
  );
};
