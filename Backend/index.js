// app.js or server.js
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const productRoutes = require("./Routes/ProductRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const OrderRoutes = require("./Routes/Order");
const UploadRoutes = require("./Routes/UploadRoutes");
const fs = require('fs');
var cors = require('cors')

require("dotenv").config();
const cookieParser = require("cookie-parser");
const CategoryRoutes = require("./Routes/CategoryRoutes");
const orderRoutes = require("./Routes/Order");
const uploadsDir = path.join(__dirname, '/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow cookies and authorization headers
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

  
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.error("MongoDB connection failed:", error));

// Product routes
// app.use('/api/products', productRoutes);

app.use("/api/users", UserRoutes);
app.use("/api/Category", CategoryRoutes);
app.use("/api/Products", productRoutes);
app.use("/api/upload", UploadRoutes);
app.use("/api/Orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const dirname = path.resolve();
app.use("/uploads", express.static(path.join(dirname + "/uploads")));

// app.use('/api/orders', OrderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
