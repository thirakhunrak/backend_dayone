const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const todoSchema = new Schema(
    {
        order: {type: Number, default: 1},
        createdAt: {type: Date, default: new Date()},
        title: {type: String, require: true}
    },
    {collection: "todo"} //ชื่อ collection ใน DB
);
// it's not work now!
todoSchema.pre('save', async function(next) {
    var max = await TodoModel.find();
    number = max.length;
    this.order = number+1;
    next();
})



var TodoModel = mongoose.model("todo", todoSchema); //ชื่อ model ใน code
module.exports = TodoModel;