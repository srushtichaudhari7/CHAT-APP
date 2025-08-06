/*************  ✨ Windsurf Command ⭐  *************/
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file, {
      folder: 'myblog',
    });
    return result.secure_url;
  } catch (error) {
    console.error(error);
    return null;
  }
};
/*******  f8b8dfab-74ee-4e97-a461-7f1575200d91  *******/