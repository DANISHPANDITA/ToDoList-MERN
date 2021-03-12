import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
  todoName: String,
});
const Todos = mongoose.model("Todos", blogSchema);
export default Todos;
