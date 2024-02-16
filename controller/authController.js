const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
//REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address } = req.body;
    if (!userName || !email || !password || !phone || !address) {
      return req.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    //check existing user
    const existing = await userModel.findOne({ email: email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "email already exist,please login",
      });
    }
    //create new user
    //hashing is done here by bcrypt
    var salt = bcrypt.genSaltSync(10); //10 is salt round
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return req.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    //check user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //compare password by decoding hashed password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(500).send({
        success: false,
        message: "Invalid password",
      });
    }
    //we are creating tokens for admin or highly confidential routes
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); //to encrypt we use sign
    res.status(200).send({
      success: true,
      message: "Successfully login, please save your token for further verifications",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
