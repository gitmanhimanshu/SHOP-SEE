const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usermodel = require("../models/usermodel.js");
const { generateToken } = require("../utils/generateToken.js");
module.exports.registerUser = async (req, res) => {
  try {
    const { email, fullname, password } = req.body;
    const userhai = await usermodel.findOne({ email: email });
    if (userhai) {
      return res.status(401).send("You already have a account please login");
    }
    const hash = await bcrypt.hash(password, 12);
    const user = await usermodel.create({
      fullname,
      email,
      password: hash,
    });
    const token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/shop");
  } catch (err) {
    res.send(err.message);
  }
};
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email: email });
  if (!user) {
    return res.send("email or password incorrect");
  }
  const t = await bcrypt.compare(password, user.password);

  if (t) {
    let token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/shop");
  } else {
    res.send("Incorrect password");
  }
};
module.exports.logout=async(req,res)=>{
  res.cookie("token","")
  res.redirect("/")
}
