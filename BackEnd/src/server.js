// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";



dotenv.config();

const app = express();

const __dirname = path.resolve();

const port = process.env.PORT || 3000

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);



// make ready for deployment 
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", function (_, res, next) {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}





app.listen(port, () => console.log("Server is running port: " + port));