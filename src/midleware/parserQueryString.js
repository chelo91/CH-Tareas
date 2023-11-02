export const parserQueryString = (req, res, next) => {

    const page = parseInt(req.query?.page ?? 1);
    const limit = parseInt(req.query?.limit ?? 5);
    const orderQuery = req.query?.order ?? null;
    const filters = {};
    let order = null;

    if (req.baseUrl === '/api/products') {
        const available = req.query?.available ?? null
        const category = req.query?.category ?? null
        if (available === 0) {
            filters.stock = { $lte: 0 };
        } else if (available === 1) {
            filters.stock = { $gt: 0 };
        }
        if (category !== null) {
            filters.category = capitalizeFirstLetter(category);
        }
        if (orderQuery != null) {
            order = [['price', orderQuery]];
        }
    } else if (req.baseUrl === '/api/carts') {

    }

    res.locals.query = {
        page: page,
        limit: limit,
        order: order,
        filters: filters
    }
    next();
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
