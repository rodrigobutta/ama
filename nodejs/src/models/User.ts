import { Document, Schema, Model, model, Error } from "mongoose";
import * as bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  password: string;
}

export const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: 'Username is required!',
    },
    password: String,
  }, {
    timestamps: true,
  }
);


userSchema.pre<IUser>("save", function save(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err: Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {
  bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
    callback(err, isMatch);
  });
};

export const User: Model<IUser> = model<IUser>("User", userSchema);
