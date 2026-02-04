// const express = require('express');
import express from "express";

const app = express();

app.get("/api/auth/signup", function(req, res, next){
    res.send("signup endpoint")
})
app.get("/api/auth/login", function(req, res, next){
    res.send("login endpoint")
})
app.get("/api/auth/logout", function(req, res, next){
    res.send("logout endpoint")
})





app.listen(3000,()=> console.log("Server sunning in 3000"));