const express = require("express");
const router = express.Router();
const faker = require("faker");

// GET route
router.get("/", (req, res) => {
  // Handle GET request logic here
  res.send("GET request");
});
router.get("/products", (req, res) => {
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
router.get("/products/filter", (req, res) => {
    // Handle GET request logic here
    res.send("Filter GET request");
});

router.get("/products/:id", (req, res) => {
  // Handle GET request logic here
  res.json({ id: req.params.id, name: `Product ${req.params.id}` });
});




router.get("/categories", (req, res) => {
  // Handle GET request logic here
  res.json([
    // res.send() can also be used
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
  ]);
});
router.get("/categories/:id", (req, res) => {
  // Handle GET request logic here
  res.json({ id: req.params.id, name: `Category ${req.params.id}` });
});

// GET route with query string for users
router.get("/users", (req, res) => {
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
router.post("/", (req, res) => {
  // Handle POST request logic here
  res.send("POST request");
});

// PUT route
router.put("/:id", (req, res) => {
  // Handle PUT request logic here
  res.send(`PUT request for ID: ${req.params.id}`);
});

// DELETE route
router.delete("/:id", (req, res) => {
  // Handle DELETE request logic here
  res.send(`DELETE request for ID: ${req.params.id}`);
});

module.exports = router;
