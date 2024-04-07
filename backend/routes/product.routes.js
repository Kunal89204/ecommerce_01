const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const User = require("../models/user.model");
const upload = require("../middlewares/multer")

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get individual product info

router.get("/:id", async (req, res) => {
    try {
        const data = await Product.findById(req.params.id)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

// Uploading a new product
router.post("/", upload.single("product") , async (req, res) => {
  try {
    const { description, name, price, stock, category, owner } =
      req.body;
      const filekanaam = req.file.filename;

    // Validate input data
    if (!description || !name || !price || !stock || !category || !owner) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find the category by name
    const categoryObject = await Category.findOne({ name: category });
    if (!categoryObject) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find the user by name
    const userObject = await User.findOne({ username: owner });
    if (!userObject) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the product
    const product = await Product.create({
      description,
      name,
      productImage:filekanaam,
      price,
      stock,
      category: categoryObject._id,
      owner: userObject._id,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// updating the product
router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updateProduct = await Product.findByIdAndUpdate(productId, req.body);

    res.json(updateProduct);
  } catch (error) {
    console.log(error);
  }
});

// deleting a product

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await Product.findByIdAndDelete(productId);

    res.json(deleteProduct);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
