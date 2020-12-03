import { Document, Schema, Model, model } from "mongoose";

export interface IItem extends Document {
  // _id: String;
  title: String;
  image: String;
}

export const itemSchema = new Schema(
  {
    // _id: {
    //   type: String,
    //   required: true,
    //   unique: true
    // },
    title: String,
    image: String,
  },
  {
    timestamps: false,
  }
);

export const Item: Model<IItem> = model<IItem>("Item", itemSchema);
