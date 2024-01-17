const express = require("express");
const app = express();
app.enable("strict routing");
const router = express.Router({
  strict: app.get("strict routing"),
  caseSensitive: app.get("case sensitive routing"),
});
const faker = require("faker");
const ProductsService = require("../services/product.service");

const productsService = new ProductsService();

// GET route
router.get("/", async (req, res) => {
  // Handle GET request logic here
  res.send("GET request");
});
router.get("/products", async (req, res) => {
  // Handle GET request logic here
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      id: i,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      color: faker.commerce.color(),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});
router.get("/products/filter", async (req, res) => {
  // Handle GET request logic here
  res.send("Filter GET request");
});

router.get("/products/:id", async (req, res) => {
  // Handle GET request logic here
  const product = await productsService.getProductById(req.params.id);
  res.json(product);
});

router.get("/categories", async (req, res) => {
  // Handle GET request logic here
  const categories = await productsService.getCategories();
  res.json(categories);
});
router.get("/categories/:id", async (req, res) => {
  // Handle GET request logic here
  const category = await productsService.getCategoryById(req.params.id);
  res.json(category);
});

// GET route with query string for users
router.get("/users", async (req, res) => {
  // Handle GET request logic here
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send("No query string provided");
  }
});

// POST route
router.post("/", async (req, res) => {
  // Handle POST request logic here
  res.send("POST request");
});

// PUT route
router.put("/:id", async (req, res) => {
  // Handle PUT request logic here
  res.send(`PUT request for ID: ${req.params.id}`);
});

// DELETE route
router.delete("/:id", async (req, res) => {
  // Handle DELETE request logic here
  res.send(`DELETE request for ID: ${req.params.id}`);
});

module.exports = router;
