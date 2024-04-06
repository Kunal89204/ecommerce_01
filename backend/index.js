const express = require("express");
const app = require('./app');
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/users.routes");
const userCategory = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes")
const connectDB = require("./db/dbconnect"); // Import the database connection function

// Connect to MongoDB
connectDB();

// Use your routes
app.use("/users", userRoutes);


// getting specific user's info
app.use("/users/:id", userRoutes);


app.use("/category", userCategory);
app.use("/product", productRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
