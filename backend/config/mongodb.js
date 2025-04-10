import mongoose from "mongoose";

const connectDB = async()=>{
	mongoose.connection.on('connected',()=>console.log("DATABASE CONNECTED"))

	await mongoose.connect(`${process.env.MONGODB_URI}/Appointment`)
}
export default connectDB

// const mongoose = require("mongoose");
// require("dotenv").config();

// const { MONGODB_URL } = process.env;

// exports.connect = () => {
// 	mongoose
// 		.connect(MONGODB_URL, {
// 			useNewUrlparser: true,
// 			useUnifiedTopology: true,
// 		})
// 		.then(console.log(`DB Connection Success`))
// 		.catch((error) => {
// 			console.log(`DB Connection Failed`);
// 			console.log(error);
// 			process.exit(1);
// 		});
// };
