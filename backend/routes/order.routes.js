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

// place orders
router.post("/:id", async (req, res) => {
  try {
    const { orderPrice, customer, address, status, quantity } = req.body;
    const productId = req.params.id;

    // Validate input data
    if (!orderPrice || !customer || !address || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find the customer by username
    const customerUser = await User.findOne({ username: customer });
    if (!customerUser) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Construct the order item object
    const orderItem = {
      productId: product._id,
      quantity, 
    };

    // Create the order and push the order item
    const newOrder = await Order.create({
      orderPrice,
      customer: customerUser._id,
      orderItems: [orderItem], // Add the order item to the orderItems array
      address,
      status,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// update order
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const updateOrder = await Order.findByIdAndUpdate(id, req.body)
    res.json(updateOrder)
  } catch (error) {
    console.log(error)
  }
})
// delete order
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const deleteOrder = await Order.findByIdAndDelete(id)
    res.json(deleteOrder)
  } catch (error) {
    console.log(error)
  }
})


module.exports = router