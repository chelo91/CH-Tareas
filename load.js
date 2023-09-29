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
        thumbnail: ['image1.jpg', 'image2.jpg'],
    },
    {
        title: 'Smartphone Google Pixel 6',
        description: 'Teléfono inteligente con cámara de alta calidad.',
        code: 'P002',
        price: 799.99,
        status: true,
        stock: 50,
        category: 'Teléfonos',
        thumbnail: ['image3.jpg', 'image4.jpg'],
    },
    {
        title: 'Router WiFi Mesh',
        description: 'Router de malla para una conexión WiFi rápida y confiable.',
        code: 'P003',
        price: 129.99,
        status: true,
        stock: 20,
        category: 'Redes',
        thumbnail: ['image5.jpg', 'image6.jpg'],
    },
    {
        title: 'Auriculares Bluetooth Sony',
        description: 'Auriculares inalámbricos con cancelación de ruido.',
        code: 'P004',
        price: 199.99,
        status: true,
        stock: 40,
        category: 'Audio',
        thumbnail: ['image7.jpg', 'image8.jpg'],
    },
    {
        title: 'Impresora HP LaserJet',
        description: 'Impresora láser de alta velocidad para la oficina.',
        code: 'P005',
        price: 299.99,
        status: true,
        stock: 15,
        category: 'Impresoras',
        thumbnail: ['image9.jpg', 'image10.jpg'],
    },
    {
        title: 'Monitor Gaming Acer',
        description: 'Monitor curvo de alta tasa de actualización para juegos.',
        code: 'P006',
        price: 399.99,
        status: true,
        stock: 25,
        category: 'Monitores',
        thumbnail: ['image11.jpg', 'image12.jpg'],
    },
    {
        title: 'Teclado Mecánico Corsair',
        description: 'Teclado mecánico para jugadores con retroiluminación RGB.',
        code: 'P007',
        price: 129.99,
        status: true,
        stock: 35,
        category: 'Periféricos',
        thumbnail: ['image13.jpg', 'image14.jpg'],
    },
    {
        title: 'Disco Duro Externo WD',
        description: 'Unidad de almacenamiento externo de 2 TB con USB 3.0.',
        code: 'P008',
        price: 79.99,
        status: true,
        stock: 60,
        category: 'Almacenamiento',
        thumbnail: ['image15.jpg', 'image16.jpg'],
    },
    {
        title: 'Cámara de Seguridad Nest',
        description: 'Cámara de seguridad para el hogar con visión nocturna.',
        code: 'P009',
        price: 149.99,
        status: true,
        stock: 10,
        category: 'Seguridad',
        thumbnail: ['image17.jpg', 'image18.jpg'],
    },
    {
        title: 'Tableta Gráfica Wacom',
        description: 'Tableta gráfica para ilustradores y diseñadores.',
        code: 'P010',
        price: 249.99,
        status: true,
        stock: 18,
        category: 'Diseño',
        thumbnail: ['image19.jpg', 'image20.jpg'],
    },
];



const loadAxios = async () => {
    const response = await axios.get(`${url}:${port}/api/products`);
    await sleep(500);
    console.log("Todos los Productos");
    console.log(response.data);
    const productsApi = response.data.payload || [];
    console.log("ELIMINO todos los Productos");
    console.log(productsApi.data)
    for (let i = 0; i < productsApi.length; i++) {
        try {
            const response = await axios.delete(`${url}:${port}/api/products/${productsApi[i].id}`);
            console.log(response.data);
        } catch (error) {
            console.error(error.response);
        }
        await sleep(500);
    }
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
