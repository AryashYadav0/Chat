import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are require" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at 6 character" })
        }
        // check if email is valid: regex 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }
         
        //user
        const user = await User.findOne({email});
        if(user) {
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
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({ 
                _id:newUser._id, 
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({message: "invalid user data"})
        }


    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({message:"Internal server error"})
    }
};