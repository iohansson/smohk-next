import '@/helpers/db';
import { SmokingModel, type Smoking } from './Smoking.model';

export const findOrCreateSmoking = async ({
  smoker,
  dateStamp,
}: {
  smoker: string;
  dateStamp: number;
}) => {
  return (
    (await findSmoking({ smoker, dateStamp })) ??
    createSmoking({ smoker, dateStamp })
  );
};

export const findSmoking = async ({
  smoker,
  dateStamp,
}: {
  smoker: string;
  dateStamp: number;
}) => {
  return SmokingModel.findOne({ smoker, dateStamp }).select('-_id -__v');
};

export const updateSmoking = async (
  filter: { smoker: string; dateStamp: number },
  data: Smoking,
) => {
  return SmokingModel.findOneAndUpdate(filter, data, { new: true }).select(
    '-_id -__v',
  );
};

export const createSmoking = async ({
  smoker,
  dateStamp,
}: {
  smoker: string;
  dateStamp: number;
}) => {
  return SmokingModel.create({
    smoker,
    dateStamp,
  });
};
