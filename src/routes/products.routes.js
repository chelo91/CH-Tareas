import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'
import express from 'express'

import { pathImg } from '../helper/utilsPath.js'

// PODRIAS MOVER ESTO A UNA CARPETA UTILS Y EXPORTARLO, ASI LO PODES USAR DONDE QUIERAS
import multer from 'multer'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathImg)
  },
  filename: function (req, file, cb) {
    // ACA PODRIAS FORMATEAR EL FILENAME PARA QUE NO TENGA ESPACIOS, PORQUE EN OCASIONES ESO PUEDE TRAERTE ERRORES AL MOMENTO DE QUERER RENDERIZAR LA IMAGEN.
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})
const upload = multer({ storage: storage })

export const router = express.Router()

router.get('/', getProducts)
router.get('/:pid', getProductById)
router.post('/', upload.array('thumbnail'), createProduct)
router.put('/:pid', updateProduct)
router.delete('/:pid', deleteProduct)
/*router.post('/image', upload.array('image'), (req, res) => {
    console.log(req.file);
    res.send('ok');
});*/
