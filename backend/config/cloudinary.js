import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary= async()=>{
	cloudinary.config({
		cloud_name:process.env.CLOUDINARY_NAME,
		api_key:process.env.CLOUDINARY_API_KEY,
		api_secret:process.env.CLOUDINARY_SECRET_KEY
	})
}

export default connectCloudinary

// const cloudinary = require("cloudinary").v2; 

// exports.cloudinaryConnect = () => {
// 	try {
// 		cloudinary.config({
// 			cloud_name: process.env.CLOUD_NAME,
// 			api_key: process.env.API_KEY,
// 			api_secret: process.env.API_SECRET,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
