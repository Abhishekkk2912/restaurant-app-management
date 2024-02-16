const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controller/foodController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

//routes
router
  .post("/create", authMiddleware, createFoodController)
  .get("/getAll", getAllFoodsController)
  .get("/get/:id", getSingleFoodController)
  .get("/getByResturant/:id", getFoodByResturantController)
  .put("/update/:id", authMiddleware, updateFoodController)
  .delete("/delete/:id", authMiddleware, deleteFoodController)
  .post("/placeorder", authMiddleware, placeOrderController)
  .post(
    "/orderStatus/:id",
    authMiddleware,
    adminMiddleware,
    orderStatusController
  );

module.exports = router;
