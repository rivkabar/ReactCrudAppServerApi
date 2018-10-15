const faker = require('faker');
const flatMap = require('lodash/flatMap');
const createUniqId = (id = 0) => () => (++id);

const baseColors = ['F6511E', 'FDB42B', '7EB822'];
const generateImage = (catIndex, id) => {
  const color = baseColors[catIndex % baseColors.length];
  return `https://placehold.it/200x200/${color}/?text=${id}`;
};

function generate () {
  const uniqId = createUniqId();
  const categories = ['Headphones', 'Keyboards', 'Drones']
    .map((name) => ({ id: uniqId(), name }));

  const products = flatMap(categories, (category, catIndex) => (
    Array.from({ length: 5 }, () => {
      const id = uniqId();
      
      return {
        id: id,
        categoryId: category.id,
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: generateImage(catIndex, id)
      };
    })
  ));

  return { categories, products };
}

module.exports = generate;