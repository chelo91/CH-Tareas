import { faker } from '@faker-js/faker'

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.uuid(),
        price: parseFloat(faker.commerce.price()),
        status: faker.datatype.boolean(1),
        stock: faker.number.int({ min: 1, max: 10 }),
        category: faker.commerce.department(),
        thumbnail: [faker.image.imageUrl()]
    }
}