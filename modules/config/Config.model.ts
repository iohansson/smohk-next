import { type Model, Schema, model, models, HydratedDocument } from 'mongoose';

export type ConfigData = {
  interval: number;
  packPrice: number;
  packAmount: number;
};

type ConfigRelations = {
  smoker: string;
};

export type Config = ConfigData & ConfigRelations;

const modelSchema = new Schema<Config>({
  interval: { type: Number, required: false },
  packPrice: { type: Number, required: false },
  packAmount: { type: Number, required: false },
  smoker: { type: String, required: true },
});

modelSchema.index({ smoker: 1 });

type ConfigModel = Model<Config>;

export type ConfigDocument = HydratedDocument<Config>;

export const ConfigModel = (models.Config ??
  model<Config>('Config', modelSchema)) as ConfigModel;
