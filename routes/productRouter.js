const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/productmodel");
router.post("/create", upload.single("image"), async (req, res) => {
  console.log(req.file); // Log the file object
  console.log(req.body); // Log the form data
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "Product Created Successfully");
    res.redirect("/shop");
    
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
