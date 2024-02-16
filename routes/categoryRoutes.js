const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require("../controller/categoryController");

const router = express.Router();

//routes
router
  .post("/create", authMiddleware, createCatController)
  .get("/getAll", getAllCatController)
  .put("/update/:id", authMiddleware, updateCatController)
  .delete("/delete/:id", authMiddleware, deleteCatController);

module.exports = router;
