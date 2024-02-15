import multer from "multer";

const storage = (destination) => multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destination);
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.replace(/\s+/g, '');
        cb(null, `${Date.now()}-${fileName}`);
    }
});

export const upload = (destination) => multer({ storage: storage(destination) });
