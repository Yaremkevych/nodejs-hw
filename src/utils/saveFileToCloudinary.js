import { Readable } from 'node:stream';
import { v2 as cloud } from 'cloudinary';

cloud.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function saveFileToCloudinary(buffer, userId) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloud.uploader.upload_stream(
      {
        resource_type: 'image',
        public_id: `users/avatars/${userId}`,
        overwrite: true,
        unique_filename: false,
      },
      (err, result) => (err ? reject(err) : resolve(result)),
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}
