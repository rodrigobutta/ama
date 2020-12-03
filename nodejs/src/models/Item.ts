import { Document, Schema, Model, model } from "mongoose";

export interface IItem extends Document {
  title: String;
  image: String;
}

export const itemSchema = new Schema(
  {
    title: String,
    image: String,
  },
  {
    timestamps: false,
  }
);

export const Item: Model<IItem> = model<IItem>("Item", itemSchema);
