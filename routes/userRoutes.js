const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  deleteUserController,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//routes

router
  .get("/getuser", authMiddleware, getUserController)
  .put("/updateUser", authMiddleware, updateUserController)
  .post("/updatePassword", authMiddleware, updatePasswordController)
  .delete("/deleteUser/:id",authMiddleware,deleteUserController);

module.exports = router;
