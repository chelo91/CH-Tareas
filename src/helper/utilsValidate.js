const validateProps = (propProduct, product, update = false) => {
    propProduct.forEach(prop => {

        //solo valido el campo que sea solo lectura cuando se vaya a crear un producto
        if (!update || (update && !prop.readOnly)) {
            if (!product[prop.name] || product[prop.name] == undefined) {
                throw new Error(`El campo ${prop.name} no es correcto`);
            }
            if (prop.type == 'string' && product[prop.name].trim() === '') {
                throw new Error(`El campo ${prop.name} es un string vacio`);
            }
            if (prop.type == 'number' && isNaN(product[prop.name])) {
                throw new Error(`El campo ${prop.name} no es un numero`);
            }
            if (!product.hasOwnProperty(prop.name)) {
                throw new Error(`El producto no tiene la propiedad ${prop.name}`);
            }
            if (!prop.type.startsWith("array") && prop.type !== typeof product[prop.name]) {
                throw new Error(`La propiedad ${prop.name} debe ser un tipo ${prop.type}`);
            }
            if (prop.type === "arrayOfStrings") {
                if (!Array.isArray(product[prop.name])) {
                    throw new Error(`La propiedad ${prop.name} debe ser un array de strings`);
                }
                product[prop.name].forEach(element => {
                    if ("string" !== typeof element) {
                        throw new Error(`Todos los elementos de ${prop.name} deben ser un string`);
                    }
                });
            }
        }
    });
    return true;

}

export { validateProps };