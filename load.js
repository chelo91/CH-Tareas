import { url, port } from './src/helper/utilsPath.js';
import axios from 'axios';

const products = [
    {
        title: 'Laptop ASUS ROG',
        description: 'Potente laptop para juegos con pantalla Full HD.',
        code: 'P001',
        price: 1499.99,
        status: true,
        stock: 30,
        category: 'Computadoras',
        thumbnail: [],
    },
    {
        title: 'Smartphone Google Pixel 6',
        description: 'Teléfono inteligente con cámara de alta calidad.',
        code: 'P002',
        price: 799.99,
        status: true,
        stock: 50,
        category: 'Teléfonos',
        thumbnail: [],
    },
    {
        title: 'Router WiFi Mesh',
        description: 'Router de malla para una conexión WiFi rápida y confiable.',
        code: 'P003',
        price: 129.99,
        status: true,
        stock: 20,
        category: 'Redes',
        thumbnail: [],
    },
    {
        title: 'Auriculares Bluetooth Sony',
        description: 'Auriculares inalámbricos con cancelación de ruido.',
        code: 'P004',
        price: 199.99,
        status: true,
        stock: 40,
        category: 'Audio',
        thumbnail: [],
    },
    {
        title: 'Impresora HP LaserJet',
        description: 'Impresora láser de alta velocidad para la oficina.',
        code: 'P005',
        price: 299.99,
        status: true,
        stock: 15,
        category: 'Impresoras',
        thumbnail: [],
    },
    {
        title: 'Monitor Gaming Acer',
        description: 'Monitor curvo de alta tasa de actualización para juegos.',
        code: 'P006',
        price: 399.99,
        status: true,
        stock: 25,
        category: 'Monitores',
        thumbnail: [],
    },
    {
        title: 'Teclado Mecánico Corsair',
        description: 'Teclado mecánico para jugadores con retroiluminación RGB.',
        code: 'P007',
        price: 129.99,
        status: true,
        stock: 35,
        category: 'Periféricos',
        thumbnail: [],
    },
    {
        title: 'Disco Duro Externo WD',
        description: 'Unidad de almacenamiento externo de 2 TB con USB 3.0.',
        code: 'P008',
        price: 79.99,
        status: true,
        stock: 60,
        category: 'Almacenamiento',
        thumbnail: [],
    },
    {
        title: 'Cámara de Seguridad Nest',
        description: 'Cámara de seguridad para el hogar con visión nocturna.',
        code: 'P009',
        price: 149.99,
        status: true,
        stock: 10,
        category: 'Seguridad',
        thumbnail: [],
    },
    {
        title: 'Tableta Gráfica Wacom',
        description: 'Tableta gráfica para ilustradores y diseñadores.',
        code: 'P010',
        price: 249.99,
        status: true,
        stock: 18,
        category: 'Diseño',
        thumbnail: [],
    },
];



const loadAxios = async () => {
    const response = await axios.get(`${url}:${port}/api/products`);
    await sleep(500);
    console.log("Todos los Productos");
    console.log(response.data);
    const productsApi = response.data.payload || [];
    /*console.log("ELIMINO todos los Productos");
    console.log(productsApi.data)
    for (let i = 0; i < productsApi.length; i++) {
        try {
            const response = await axios.delete(`${url}:${port}/api/products/${productsApi[i].id}`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response);
        }
        await sleep(500);
    }*/
    console.log("Los vuelvo a agregar");
    for (let i = 0; i < products.length; i++) {
        try {
            const response = await axios.post(`${url}:${port}/api/products`, products[i]);
            console.log(response.data);
        } catch (error) {
            console.error(error.response);
        }
        await sleep(500);
    }
    /*console.log("Creo carritos");
    for (let i = 0; i < 5; i++) {
        try {
            const response = await axios.post(`${url}:${port}/api/carts`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response);
        }
        await sleep(500);
    }*/
};
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
loadAxios();
