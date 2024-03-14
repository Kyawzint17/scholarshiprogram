// api/uploadImage.js

import dbConnect from "@/lib/db";
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';

const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: 'uploads',
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    if (req.files && req.files.image) {
      const file = req.files.image;

      req.body.image = {
        data: fs.readFileSync(file.path),
        contentType: file.mimetype,
      };

      // Save the image information in your database if needed
      // You can store the image information in your WorkModel or a separate ImageModel

      res.status(200).json({ success: true, file });
    } else {
      res.status(400).json({ error: 'No image file uploaded' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Add this line before exporting the handler function
export const config = {
  api: {
    bodyParser: false, // Disable the default body parser to allow `multer` to handle file uploads
  },
};