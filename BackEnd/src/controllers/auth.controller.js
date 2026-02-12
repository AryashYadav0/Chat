import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// signup 
export const signup = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are require" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at 6 character" })
        }
        // check if email is valid: with help of regex 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }

        //user
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email is already exists" })
        }

        //password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {

            // generateToken(newUser._id, res)
            // await newUser.save()

            const saveUser = await newUser.save();
            generateToken(saveUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });


            // send a welcome email to user when they sign up
            try {
                await sendWelcomeEmail(saveUser.email, saveUser.fullName, ENV.CLIENT_URL);
                console.log("Email sent successfully to ", saveUser.email);

            } catch (error) {
                console.error("Error sending welcome:", error);
            }
        } else {
            res.status(400).json({ message: "invalid user data" })
        }


    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({ message: "Internal server error" })
    }
};

// login 
export const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Invalid credentials" })
        // never tell the client which one is incorrect: password or email
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller:", error);
        res.status(500).json({message:"Internal server error"})

    }
}

// logout
export const logout = (_, res, next) => {
    res.cookie("jwt")
}