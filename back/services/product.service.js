const faker = require("faker");
const Boom = require("boom");

class ProductsService {
  constructor() {
    this.products = [];
    this.generateProducts(10); // Generate 10 products initially
  }

  generateProducts(count) {
    for (let i = 0; i < count; i++) {
      const product = {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
      };
      this.products.push(product);
    }
  }

  async getAllProducts() {
    return this.products;
  }

  async getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw Boom.notFound("Product not found");
    }
    return product;
  }

  async addProduct(product) {
    this.products.push(product);
  }

  async updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw Boom.notFound("Product not found");
    }
    this.products[index] = updatedProduct;
  }

  async deleteProduct(id) {
    const initialLength = this.products.length;
    this.products = this.products.filter((product) => product.id !== id);
    if (this.products.length === initialLength) {
      throw Boom.notFound("Product not found");
    }
  }
}

module.exports = ProductsService;
