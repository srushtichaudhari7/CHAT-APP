import {v2 as cloudinary} from 'cloudinary';

import {config} from 'dotenv';

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,      
});

export default cloudinary;
/*******  f8b8dfab-74ee-4e97-a461-7f1575200d91  *******/