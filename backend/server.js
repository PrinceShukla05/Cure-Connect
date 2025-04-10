import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js';
// const database = require("./config/mongodb");
// const { cloudinaryConnect } = require("./config/cloudinary");
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';


const app=express()
const PORT = process.env.PORT || 4000
connectDB()
connectCloudinary()
// database.connect();
// cloudinaryConnect();


app.use(express.json());
app.use(cors())

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

// End of code.