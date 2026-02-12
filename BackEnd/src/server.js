// const express = require('express');
import express from "express";
import path from "path";

import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

import { ENV } from "./lib/env.js";  // env variables from .env file `phle me import "dotenv/config" `



const app = express();

const __dirname = path.resolve();

const port = ENV.PORT || 3000

app.use(express.json()) //req.body

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);



// make ready for deployment 
if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", function (_, res, next) {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}





app.listen(port, () => {
    console.log("Server is running port: " + port)
    connectDB();
}

);