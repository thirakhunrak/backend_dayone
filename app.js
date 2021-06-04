const express = require("express");
const connectdb = require("./db/connect");
const echo = require("./node_app/controller/echo");
const todo = require("./node_app/controller/todo");

const main = async () => {
	await connectdb();
	var app = express();
	app.use(express.json());
	app.use("/app/echo", echo);
	app.use("/app/no_auth", todo);

	app.listen(3000);
};

main();