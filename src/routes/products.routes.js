import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import express from "express";

import { pathImg } from '../helper/utilsPath.js';
import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathImg);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

export const router = express.Router();

router.get('/', getProducts);
router.get('/:pid', getProductById);
router.post('/', upload.array('thumbnail'), createProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);
/*router.post('/image', upload.array('image'), (req, res) => {
    console.log(req.file);
    res.send('ok');
});*/
