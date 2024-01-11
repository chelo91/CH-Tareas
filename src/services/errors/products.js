export const productNotExistError = (idProd) => {
    return `El product id ${idProd} no existe`
}

export const productCustomError = (err) => {
    return `${err}`
}

export const productNullIdError = () => {
    return "El id del producto no puede ser nulo. ";
}
