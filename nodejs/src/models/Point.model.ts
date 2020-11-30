import mongoose from "mongoose";


const pointSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Mobile ID is required!',
  },
}, {
  timestamps: false,
})

const Point = mongoose.model("Point", pointSchema)

export default Point;