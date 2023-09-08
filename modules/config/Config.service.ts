'use server';

import '@/helpers/db';
import { ConfigModel, type Config } from './Config.model';
import { defaultConfig } from './Config.defaults';

export const findOrCreateConfig = async ({ smoker }: { smoker: string }) => {
  const c = await ConfigModel.findOne({ smoker }).select('-_id -__v');
  if (c) return c;
  return createConfig({ smoker });
};

export const updateConfig = async (
  filter: { smoker: string },
  data: Config,
) => {
  return ConfigModel.findOneAndUpdate(filter, data, {
    new: true,
  });
};

export const createConfig = async ({ smoker }: { smoker: string }) => {
  return ConfigModel.create({
    ...defaultConfig,
    smoker,
  });
};
