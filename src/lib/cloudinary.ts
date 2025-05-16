import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const uploadVideoToCloudinary = async (fileBuffer: Buffer, fileName: string): Promise<{ public_id: string; secure_url: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
        folder: 'video-captions',
        public_id: fileName.replace(/\.[^/.]+$/, ''), // Remove extension
        chunk_size: 6000000, // 6MB chunks
        eager: [
          { width: 300, height: 300, crop: 'pad', audio_codec: 'none' }, // Generate thumbnail
        ],
        eager_async: true,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Upload failed'));
        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: 'video',
    invalidate: true
  });
};