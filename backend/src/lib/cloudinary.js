import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';    
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

//cloudinary configuration file
//imports cloudinary and dotenv
//configures cloudinary with credentials from environment variables
//exports configured cloudinary instance for use in other files