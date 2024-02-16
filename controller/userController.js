const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

//getUser
const getUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        messsage: "User not found",
      });
    }
    //hide password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Successfully get user data",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get user API",
      error,
    });
  }
};

//updateUser
const updateUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        messsage: "User not found",
      });
    }
    const { userName, phone, address } = req.body;
    if (userName) user.userName = userName;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "user updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update user API",
      error,
    });
  }
};

//updatepassword
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        messsage: "User not found",
      });
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        messsage: "Please provide old and new password",
      });
    }
    //compare password by decoding hashed password
    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isMatched) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //now saving new password with hashing
    var salt = bcrypt.genSaltSync(10); //10 is salt round
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "password updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update password API",
      error,
    });
  }
};

//deleteuser
const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete user API",
      error,
    });
  }
};

//all exports
module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  deleteUserController,
};
