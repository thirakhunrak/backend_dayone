const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
	{
		username: { type: String, required: true },
		password: String,
		login_count: Number,
		tag: [String],
	},
	{ collection: "user" }
);

UserSchema.index({ username: 1 });

module.exports = mongoose.model("user", UserSchema);