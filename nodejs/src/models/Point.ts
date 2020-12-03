import { Document, Schema, Model, model } from "mongoose";

export interface IPoint extends Document {
  name: String;
  image: String;
  email: String;
  whatsapp: String;
  latitude: Number;
  longitude: Number;
  city: String;
  uf: String;
  image_url: String;
}

export const pointSchema = new Schema(
  {
    name: String,
    image: String,
    email: String,
    whatsapp: String,
    latitude: Number,
    longitude: Number,
    city: String,
    uf: String,
    image_url: String,
  },
  {
    timestamps: false,
  }
);

export const Point: Model<IPoint> = model<IPoint>("Point", pointSchema);
