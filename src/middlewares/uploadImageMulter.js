import multer from "multer";
import { pathImg } from '../config/const.config.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathImg);
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.replace(/\s+/g, '');
        cb(null, `${Date.now()}-${fileName}`);
    }
});

export const upload = multer({ storage: storage });
