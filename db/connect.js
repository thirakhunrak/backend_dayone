const db = require("mongoose");
const url = "mongodb+srv://admin:1234@cluster0.gbye8.mongodb.net/internship?retryWrites=true&w=majority";

const connectdb = () => db.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err) =>{
    if (err)
        console.error(err);
    else
        console.log("Connected to the mongodb");
});

module.exports = connectdb;

