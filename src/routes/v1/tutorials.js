const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { dbConfig, jwtSecret } = require('../../config');
const { authorized } = require("../../middlewares/auth")

const router = express.Router();


const tutorialSchema = Joi.object({
    user_id: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    private: Joi.boolean().required()
});

router.get("/user-tutorials/:id", authorized,  async (req,res) => {
    const userId = req.params.id
    // console.log(userId)
    let tryId = req.user.userId
    console.log(tryId)
    // tryId = userId
    try{
    const con = await mysql.createConnection(dbConfig);
    const [resp] = await con.query("SELECT * FROM tutorials WHERE user_id = ?", [userId]);
    con.end();
    res.send({resp, tryId})
    }catch(err){
        res.status(500).send(err)
    }
});


router.get("/online", authorized,  async (req,res) => {
    if(req.user) {
    // let userId = req.user.userId
    try{
    const con = await mysql.createConnection(dbConfig);
    const [resp] = await con.query(`SELECT
    tutorials.id, tutorials.user_id, tutorials.title, tutorials.content, tutorials.private, users.email
    FROM tutorials
    LEFT JOIN users ON users.id = tutorials.user_id`);
    con.end();
    res.send({resp, userId: req.user.userId});
    }catch(err){
        res.status(500).send(err);
    }
}else {
    console.log(req.noToken.token)

}

});

router.get("/offline", async (req, res) => {
    try {
        const con = await mysql.createConnection(dbConfig);
        const [resp] = await con.query(`SELECT
        tutorials.id, tutorials.user_id, tutorials.title, tutorials.content, tutorials.private, users.email 
        FROM tutorials
        LEFT JOIN users ON users.id = tutorials.user_id
        WHERE private = false`);
        con.end();
        res.send(resp);
    }catch(err) {
        res.status(500).send(err);
    }
});

router.post("/", authorized, async (req, res) => {
    let tutorial = req.body

    // console.log(req.user.id)
    let userIdToken = req.user.userId
    console.log(userIdToken)

    try{
        tutorial = await tutorialSchema.validateAsync(tutorial)
    }catch(err){
        console.log(err)
        return res.status(400).send({error: "errrr"})
    }


    try {
        const con = await mysql.createConnection(dbConfig);
        const [resp] = await con.query("INSERT INTO tutorials SET ?", [tutorial]);
        con.end();
        res.send({resp, userIdToken})
    }catch(err){
        res.status(500).send(err)
    }
})



module.exports = router;