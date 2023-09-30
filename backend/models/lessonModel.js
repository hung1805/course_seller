import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  ques: {
    type: String,
    required: true,
  },
  ans: {
    type: String,
    required: true,
  },
});
const lessonSchema = mongoose.Schema({
  purpose: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  type: {
    type: String,
    required: true,
  },
});

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;
