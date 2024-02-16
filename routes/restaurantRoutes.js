const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controller/restaurantController");
const router = express.Router();

//routes

router
  .post("/create", authMiddleware, createRestaurantController)
  .get("/getAll", getAllRestaurantController)
  .get("/get/:id", getRestaurantByIdController)
  .delete("/delete/:id", authMiddleware, deleteRestaurantController);

module.exports = router;
