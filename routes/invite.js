const router = require("express").Router();
const express = require("express")
const idb = require("../db/models/invite")

router.use(express.json())

router.post("/", (req, res) => {
    console.log(req.body)
    var found;
    idb.find().exec()
    .then(doms =>{doms.forEach(dom => {
        if(req.body.invite === dom.code){
            console.log("code match")
            found = true;
        }
        else{ return false }
        
    })
    if(found == true){res.json({body : "accepted"})}
    else{res.json({body: "denied"})}
})
})

module.exports = router