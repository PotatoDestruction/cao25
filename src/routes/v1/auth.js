const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { dbConfig, jwtSecret } = require('../../config');

const router = express.Router();


const userSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    reg_timestamp: Joi.string()
});

router.get("/", async (req, res) => {
    try {
        const con = await mysql.createConnection(dbConfig);
        const [resp] = await con.query("SELECT * FROM users");
        con.end();
        res.send(resp)
    }catch(err){
        res.status(500).send(err)
    }
});

router.get("/users", async (req, res) => {
    try {
        const con = await mysql.createConnection(dbConfig);
        const [resp] = await con.query("SELECT COUNT(id) AS numberOfUsers FROM users");
        con.end();
        res.send(resp[0])
    }catch(err){
        res.status(500).send(err)
    }
});


router.post("/register", async (req, res) => {
    let user = req.body
    console.log(user)

    try {
        user = await userSchema.validateAsync(user); 
        console.log("asd")     
    } catch (err) {
        res.status(400).send(err); 
        console.log(err)      
        return;
    }

    try{
        const hashedPassword = bcrypt.hashSync(user.password);
        user.password = hashedPassword;

        const con = await mysql.createConnection(dbConfig);
        const [newUser] = await con.query(
            `INSERT INTO users SET ?`, [user]);
        con.end();
        res.send(newUser);
        console.log(user)
    }catch(err){
        res.status(500).send(err)
        console.log(err)
    }
});


router.post("/login", async (req, res) => {
    let checkUser = req.body;
        
    try{
        checkUser = await userSchema.validateAsync(checkUser)
    }catch(err){
        return res.status(400).send({error: "Wrong email or password"})
    }

    try {
        const con = await mysql.createConnection(dbConfig);
        const [users] = await con.query("SELECT password, id FROM users WHERE email = ?", [checkUser.email])
        con.end();
       
        if(!users.length) {
            return res.status(400).send({error: `Wrong email or password`});
        }
        const isPasswordCorrect = bcrypt.compareSync(checkUser.password, users[0].password);
        // {   
        //     "email": "test1@test1.lt",
        //     "password": "test1"
        // }
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTc3NTQ5NTF9.IpjGOUiwrzV69PlIPwjNdutCV6x6zagFXun2sNdsnnM

        if(!isPasswordCorrect) {
            return res.status(400).send({error: `Wrong email or password`});
        }

        const token = jwt.sign({userId: users[0].id}, jwtSecret);
        ////DiZwmbXn13
        // console.log(users[0].id)
        res.send([{token},{id: users[0].id}]);
    }catch(err){
        res.status(500).send(err)
    }
})


module.exports = router;