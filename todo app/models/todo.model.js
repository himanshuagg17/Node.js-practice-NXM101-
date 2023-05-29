const mongoose=require("mongoose");

const TodoSchema=mongoose.Schema({
    title:String,
    description:String,
    created:Date
})

const TodoModel=mongoose.model("todo",TodoSchema);

module.exports={
    TodoModel
}