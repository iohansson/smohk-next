import mongoose from 'mongoose';

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@smohk.ovu81gz.mongodb.net/?retryWrites=true&w=majority`,
);
