export const productNotExistError = (idProd) => {
    return `El product id ${idProd} no existe`
}

export const userCantChangeProductError = (idProd) => {
    return `El usaurio no tiene permisos de cambiar el producto id ${idProd}`
}

export const productCustomError = (err) => {
    return `${err}`
}

export const productNullIdError = () => {
    return "El id del producto no puede ser nulo. ";
}
