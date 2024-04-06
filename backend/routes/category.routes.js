const express = require("express");
const router = express.Router();
const Category = require("../models/category.model");

// GET all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST create new category
router.post("/", async (req, res) => {
    try {
        const { categoryName } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ name: categoryName });
        if (existingCategory) {
            return res.status(409).json({ error: "Category already exists" });
        }

        // Create new category
        const newCategory = await Category.create({ name: categoryName });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT update a specific category by ID
router.put("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { newName } = req.body;

        // Check if category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        // Update category name
        category.name = newName;
        await category.save();

        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE a specific category by ID
router.delete("/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Check if category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        // Delete category
        await category.remove();

        res.json({ message: "Category deleted successfully", category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
