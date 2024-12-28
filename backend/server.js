import express from 'express'
import cors from 'cors'
import 'dotenv/config'
const database = require("./config/mongodb");
const { cloudinaryConnect } = require("./config/cloudinary");

const app=express()
const PORT = process.env.PORT || 3001;
database.connect();
cloudinaryConnect();


app.use(express.json());
app.use(cors())

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