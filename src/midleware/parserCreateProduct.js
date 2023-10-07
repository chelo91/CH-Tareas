export const parseCreateProduct = (req, res, next) => {
    req.body.price = parseFloat(req.body.price); // Campo 'price' como número (se convierte a flotante)
    if (typeof req.body.status == "string") {
        if (req.body.status.toLowerCase() == "true") {
            req.body.status = true;
        } else if (req.body.status.toLowerCase() == "false") {
            req.body.status = false
        }
    }
    req.body.stock = parseInt(req.body.stock); // Campo 'stock' como número entero
    if (req.files) {
        req.body.images = req.files.map((file) => { return file.path });
    }
    next();
};