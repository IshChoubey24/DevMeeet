const express = require("express");
const authRouter = express.Router();
const {userAuth} = require("../middlewares/auth")
const { validationSignUpDate} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
    try {
      //Validation of data
      validationSignUpDate(req);
  
      const { firstName, lastName, emailId, password } = req.body;
  
      //Encrypt the password
      const passwordHash = await bcrypt.hash(password, 10);
  
      //Creating new instances of the user model
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
      });
  
      const savedUser = await user.save();
      const token = await savedUser.getJWT();
  
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Signup Successfully...");
    } catch (err) {
      res.status(400).send("Error ocured:" + err.message);
    }
  });
  
authRouter.post("/login", userAuth, async (req, res) => {
    try{
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
  
    if (!user) {
      throw new Error("Invalid credtials");
    }
    
      const isPasswordValid = await user.validatePassword(password);
  
      if (isPasswordValid) {
        //Creating JWT Token
        const token = await user.getJWT()
        //Adding token to cookie
        res.cookie("token", token);
        
        res.send("Login Successfull...");
      } else {
        throw new Error("Password not correct");
      }
    } catch (err) {
      res.status(400).send("Error ocured:" + err.message);
    }
  });

  authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("Logout Successful!!");
  });


module.exports = authRouter;