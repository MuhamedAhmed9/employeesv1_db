import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb("Images only is required", false);
  }
};

export const fileErrorHandler = (err, req, res, next) => {
  if (err) {
    res.json({ error: `${err}` });
  } else {
    next();
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
