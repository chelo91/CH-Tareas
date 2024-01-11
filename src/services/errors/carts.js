export const addCartNullIdError = (cid, pid) => {
    let error = "";
    if (cid == null) {
        error += "El id del carrito no puede ser nulo. \n";
    }
    if (pid == null) {
        error += "El id del producto no puede ser nulo. \n";
    }
    return error;
}

export const addCartProductQuantityError = (quantity) => {
    return `La cantidad de stock de ese producto tiene que se mayor que 0 (${quantity})`
}

export const cartNotExistError = (idCart) => {
    return `El carrito id ${idCart} no existe`
}

export const cartDbError = (error) => {
    return `Error en la base de datos ${error}`
}

export const getCartsGenericError = (error = "") => {
    return `Error al obtener carritos ${error}`
}

export const getCartByIdGenericError = (error = "") => {
    return `Error al obtener carrito ${error}`
}