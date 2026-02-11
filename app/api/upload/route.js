import { NextResponse } from "next/server";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../../lib/cloudinary";
import nextConnect from "next-connect";

// Set up multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect();
apiRoute.use(upload.single("image"));

export async function POST(req) {
  return new Promise((resolve, reject) => {
    apiRoute.handle(req, {
      end: (result) => {
        try {
          const data = JSON.parse(result);
          resolve(NextResponse.json(data));
        } catch (error) {
          reject(error);
        }
      },
      setHeader: () => {},
      status: () => ({ end: () => {} }),
    });
  });
}
