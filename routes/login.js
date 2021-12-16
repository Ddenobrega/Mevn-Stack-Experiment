const router = require("express").Router();
const express = require("express");
const ldb = require("../db/models/users")
const bcrypt = require("bcrypt")

router.use(express.json())


router.post("/", (req, res) => {
  console.log(req.body.username)
  ldb.findOne({username: req.body.username}, (err,data) => {
    if(data == null || undefined){
      res.json({body: "denied"})
    }
    else{
      bcrypt.compare(req.body.password, data.password, (err, result) => {
        if(err){
          console.log(err)
        }
        if(result == true){
          res.json({body: "accepted"})
        }
        else{
          res.json({body: "denied"})
        }
      })
    }
  })
})


module.exports = router