const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const multer = require("multer");
const fs = require("fs-extra");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");

// Load environment variables
dotenv.config();

const app = express();
app.use(helmet());

/* // Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
}); */

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Configure Multer for file uploads
const uploadPath = path.join(__dirname, "uploads");
fs.ensureDirSync(uploadPath);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

// Serve uploaded files
app.use("/uploads", express.static(uploadPath));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the server!");
});
// Routes
const router = express.Router();
router.get("/products", getProducts);
router.post("/products", upload.single("image"), addProduct);
router.put("/products/:id", upload.single("image"), updateProduct);
router.delete("/products/:id", deleteProduct);
app.use("/", router);

// Error Handling
app.use((req, res, next) => next(createError(404, "Route not found")));
app.use((err, req, res, next) => {
  console.error("Global error handler:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

// Database & Server Setup
const mongoUri = process.env.MONGO_URL || "mongodb://localhost:27017/atelierdb";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
