const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownersmodel.js");
router.get("/", (req, res) => {
  res.send("it is working");
});
// console.log(process.env.NODE_ENV )
if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    const owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(503).send("you don't have permission to create");
    }
    const {fullname,password,email}=req.body
  const createdowner= await ownerModel.create({
        fullname,
        password,
        email
    })
    res.status(203).send(createdowner)
  });
}
router.get("/admin",(req,res)=>{
  let success=req.flash("success")
res.render('createproducts',{success})
})
module.exports = router;
