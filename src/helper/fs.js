import { promises as fs } from 'fs';

const loadFile = async (path, isJson = true) => {
    try {
        const data = await fs.readFile(path, 'utf8');
        if (!data) {
            console.error('Error al leer el archivo');
            return null;
        } else {
            console.log("Archivo cargado")
            if (!isJson) {
                return data;
            }
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

export { loadFile, saveFile };