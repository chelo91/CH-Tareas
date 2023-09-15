import ProductManager from './models/ProductManager.js';

const productManager = new ProductManager("./files/productos.json");
const products = [
    {
        title: 'Laptop HP Pavilion',
        description: 'Laptop HP Pavilion con procesador Intel Core i5, pantalla Full HD de 15.6 pulgadas, 8 GB de RAM y 256 GB de almacenamiento SSD.',
        price: 799.99,
        thumbnail: 'https://example.com/laptop1.jpg',
        code: 'HP123',
        stock: 50,
    },
    {
        title: 'Teléfono Samsung Galaxy S21',
        description: 'Samsung Galaxy S21 con pantalla AMOLED de 6.2 pulgadas, cámara de 12 MP, 128 GB de almacenamiento, y soporte 5G.',
        price: 999.99,
        thumbnail: 'https://example.com/phone1.jpg',
        code: 'S21-256GB',
        stock: 30,
    },
    {
        title: 'Smart TV Sony Bravia',
        description: 'Smart TV Sony Bravia de 55 pulgadas con resolución 4K, Android TV, y tecnología HDR para una experiencia de visualización excepcional.',
        price: 899.99,
        thumbnail: 'https://example.com/tv1.jpg',
        code: 'SonyTV55',
        stock: 20,
    }, {
        title: 'Apple iPhone 13 Pro Max',
        description: 'El iPhone 13 Pro Max de Apple con pantalla Super Retina XDR de 6.7 pulgadas, triple cámara, chip A15 Bionic y hasta 1TB de almacenamiento.',
        price: 1099.99,
        thumbnail: 'https://example.com/iphone13.jpg',
        code: 'iPhone13ProMax',
        stock: 40,
    },
    {
        title: 'Portátil Dell XPS 13',
        description: 'Portátil Dell XPS 13 con pantalla InfinityEdge de 13.4 pulgadas, procesador Intel Core i7, 16 GB de RAM y 512 GB de SSD.',
        price: 1299.99,
        thumbnail: 'https://example.com/dellxps13.jpg',
        code: 'XPS13',
        stock: 25,
    },
    {
        title: 'Cámara Canon EOS 5D Mark IV',
        description: 'Cámara Canon EOS 5D Mark IV con sensor CMOS de fotograma completo de 30.4 MP, grabación de video 4K y pantalla táctil de 3.2 pulgadas.',
        price: 2499.99,
        thumbnail: 'https://example.com/canon5d.jpg',
        code: 'Canon5DMarkIV',
        stock: 15,
    }];

products.forEach(prod => {
    productManager.addProduct(prod);
});

//productManager.deleteProduct(2);

const newProduct6 = {
    title: 'Sony Alpha 7 III',
    description: 'Cámara Sony Alpha 7 III con sensor CMOS de fotograma completo de 24.2 MP, grabación de video 4K, estabilización de imagen de 5 ejes y visor electrónico OLED de alta resolución.',
    price: 1999.99,
    thumbnail: 'https://example.com/sonyalpha7iii.jpg',
    code: 'SonyAlpha7III',
    stock: 20,
}

//productManager.updateProduct(6, newProduct6);
productManager.deleteProduct(4);