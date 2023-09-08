import { type Smoking } from '@/modules/smoke/Smoking.model';
import ky from 'ky';

export const fetchSmoking = ({
  smoker,
  dateStamp,
}: {
  smoker: string;
  dateStamp: number;
}) => {
  if (!smoker) return Promise.resolve(null);

  return ky
    .get('/api/smoking', { searchParams: { smoker, dateStamp } })
    .then((response) => response.json<Smoking>());
};

export const postSmoking = (data: Smoking) =>
  ky
    .post('/api/smoking', { json: data })
    .then((response) => response.json<Smoking>());
