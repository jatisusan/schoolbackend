import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const fileNamePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(fileNamePath);

// diskstorage decides where to store the uploaded files and how to name them. It takes two functions: destination and filename. The destination function specifies the folder where the files will be stored, while the filename function determines the name of the file.
let storage = multer.diskStorage({
  // choosing src/uploads folder to upload file
  destination: (req, file, cb) => {
    cb(null, path.join(dirPath, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    let suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${suffix}${extension}`);
  },
});

export let upload = multer({
  storage,
  fileFilter: null,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});
