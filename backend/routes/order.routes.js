const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");

// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST create new order
router.post("/", async (req, res) => {
    try {
      const { orderPrice, customer, orderItems, address, status } = req.body;
  
      // Validate input data
      if (!orderPrice || !customer || !orderItems || !address) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      // Check if customer exists
      const existingCustomer = await User.findById(customer);
      if (!existingCustomer) {
        return res.status(404).json({ error: "Customer not found" });
      }
  
      // Check if order items are valid products
      for (const item of orderItems) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
      }
  
      // Create new order
      const newOrder = await Order.create({ orderPrice, customer, orderItems, address, status });
      res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
// GET a specific order by ID
router.get("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update a specific order by ID
router.put("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const { orderPrice, customer, orderItems, address, status } = req.body;

    // Check if order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update order fields
    order.orderPrice = orderPrice;
    order.customer = customer;
    order.orderItems = orderItems;
    order.address = address;
    order.status = status;

    // Save updated order
    await order.save();

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE a specific order by ID
router.delete("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;

    // Check if order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Delete order
    await order.remove();

    res.json({ message: "Order deleted successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
