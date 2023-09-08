import { signal, effect } from '@preact/signals-react';
import type { ConfigData, Config } from '@/modules/config/Config.model';
import axios, { type AxiosPromise } from 'axios';

const defaultConfig: ConfigData = {
  interval: 40,
  packPrice: 6.8,
  packAmount: 20,
};

export const config = signal<ConfigData | null>(null);

const getConfig = () => {
  return (axios
    .get('/api/config') as AxiosPromise<Config>)
    .then(response => response.data);
};

const updateConfig = (data: ConfigData) => axios
  .post('/api/config', data)
  .then(response => response.data);

effect(() => {
  getConfig()
    .then((conf) => (config.value = conf))
    .catch(() => (config.value = defaultConfig));
});

export const writeConfig = async (conf: ConfigData) => {
  await updateConfig(conf);
  config.value = conf;
};
