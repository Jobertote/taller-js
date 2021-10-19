const express = require('express');
const jwt = require('jsonwebtoken');
const users = express.Router();
const db = require('../config/database');

users.post("/login", async(req, res, next) => {
    const {user, password} = req.body; 
    const query = `SELECT * FROM users WHERE user = '${user}' AND password = '${password}';`;
    const rows = await db.query(query);

    if(user && password){
        if(rows.length == 1){
            const token = jwt.sign({
                user: rows[0].user,
                password: rows[0].password
            }, "debugKey");
            return res.status(200).json({ code: 200, message: token});
        }
        else{
            return res.status(404).json({ code: 404, message: "Usuario y/o contrasena incorrectos"});
        }
    }
    return res.status(404).json({ code: 404, message: "Campos incompletos"});
});

module.exports = users;