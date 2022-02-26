import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide name"],
		minlength: 3,
		maxlength: 20,
		trim: true,
	},
	lastName: {
		type: String,
		trim: true,
		maxlength: 20,
		default: "lastName",
	},
	email: {
		type: String,
		required: [true, "Please provide email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide password"],
		minlength: 6,
	},
	location: {
		type: String,
		trim: true,
		maxlength: 20,
		default: "my city",
	},
});

export default mongoose.model("User", UserSchema);
