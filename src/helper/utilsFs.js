import { promises as fs } from 'fs';
/*import multer from "multer";
/import axios from 'axios';*/

/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathImg);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });*/


const loadFile = async (path) => {
    try {
        const data = await fs.readFile(path, 'utf8');
        if (!data) {
            console.error('Error al leer el archivo');
            return null;
        } else {
            console.log("Archivo cargado")
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error al cargar el archivo');
        return null;
    }
}

const saveFile = async (path, array) => {
    try {
        await fs.writeFile(path, JSON.stringify(array), (err) => {
            if (err) {
                console.error('Error al escribir el archivo');
                return false;
            }
        });
        console.log('Archivo guardado');
        return true;
    } catch (error) {
        console.error('Error al escribir el archivo');
        return false;
    }
}

/*const uploadImage = async (path, image) => {

    const response = await axios.get(image, { responseType: 'arraybuffer' });
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path);
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    });
    const upload = multer({ storage: storage });
    const result = await upload.single(image);
    console.log(result);
    return result;
}*/

export { loadFile, saveFile/*, /*uploadImage*/ };