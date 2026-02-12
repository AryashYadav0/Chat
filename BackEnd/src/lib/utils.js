import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {

    const { JWT_SECRET } = ENV;
    if (!JWT_SECRET) throw Error("JWT_SECRET is not configured");

    const token = jwt.sign({ userId: userId }, ENV.JWT_SECRET, { expiresIn: "7d", });


    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true, //prevent  XSS attacks: cross-side scripting
        sameSite: "strict", // CSRF attacks
        secure: ENV.NODE_ENV === "development" ? false : true,
    })
    return token;
}

// http: localMachine localhost
// https: server like chatApp.com