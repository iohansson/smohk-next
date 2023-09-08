import dayjs from 'dayjs';

export type DateFormatType = string;
export const HumanDateFormat: DateFormatType = 'ddd, DD MMM';
export const HumanDateTimeFormat: DateFormatType = 'HH:mm ddd, DD MMM';

export type DDate = Date | number | string | null;

const readDate = (date?: DDate) => {
  return typeof date === 'number'
    ? dayjs.unix(date)
    : dayjs(date ?? new Date());
};

export const dateToFormat = (date?: DDate, format?: DateFormatType): string => {
  return readDate(date).format(format ?? HumanDateFormat);
};

export const dateToStamp = (date?: DDate): number => {
  return readDate(date).unix();
};

export const dateToDateStamp = (date?: DDate): number => {
  return readDate(date).startOf('date').unix();
};

export const dateToHuman = (date?: DDate, format?: DateFormatType): string => {
  return readDate(date).format(format ?? HumanDateFormat);
};

export const timeStamp = (date?: DDate) => dateToStamp(date);
export const dateStamp = (date?: DDate) => dateToDateStamp(date);
export const todayStamp = () => dateStamp();

export const humanDate = (date?: DDate) => dateToHuman(date);
export const humanDatetime = (date?: DDate) =>
  dateToHuman(date, HumanDateTimeFormat);
