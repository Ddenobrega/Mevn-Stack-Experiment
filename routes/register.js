const router = require("express").Router()
const express = require("express")
const rdb = require("../db/models/users")
const bcrypt = require('bcrypt')
const requestIp = require("request-ip")

router.use(express.json())

router.post("/", (req, res) => {
    rdb.findOne({"username": req.body.username}).exec()
    .then(data => {if(data == null || data == undefined || data == {}){
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) console.log(err);
        
        const result = new rdb({
            username: req.body.username,
            password: hash,
            ip: requestIp.getClientIp(req),
            date: Date.now(),
            code: req.body.invite
        })
        result.save()
        res.json({body: "user created"})
    })
    }
    else{
        res.json({body: "user exists"})
        console.log("exists")
    }
})
})

module.exports = router;