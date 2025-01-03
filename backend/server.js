import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import adminRouter from './routes/adminRoute';
const database = require("./config/mongodb");
const { cloudinaryConnect } = require("./config/cloudinary");
import doctorRouter from './routes/doctorRoute';
import userRouter from './routes/userRoute';


const app=express()
const PORT = 4000;//  || process.env.PORT
database.connect();
cloudinaryConnect();


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