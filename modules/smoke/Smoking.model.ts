import mongoose, { type Model, type HydratedDocument } from 'mongoose';

const { Schema } = mongoose;

export type Smoking = {
  dateStamp: number;
  lastSmkdStamp?: number;
  count: number;
  smoker: string;
};

const SmokingSchema = new Schema<Smoking>({
  dateStamp: { type: Number, required: true },
  lastSmkdStamp: Number,
  count: { type: Number, default: 0 },
  smoker: { type: String, required: true },
});

SmokingSchema.index({ smoker: 1, dateStamp: -1 });

type SmokingModel = Model<Smoking>;

const SmokingModel = (mongoose.models.Smoking ??
  mongoose.model<Smoking>('Smoking', SmokingSchema)) as SmokingModel;

export type SmokingDocument = HydratedDocument<Smoking>;

export { SmokingModel };
