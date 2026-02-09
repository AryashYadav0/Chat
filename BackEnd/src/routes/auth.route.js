import  express from 'express';
import { signup } from '../controllers/auth.controller.js';
const router = express.Router();

router.post("/signup", signup)

router.get("/login", function(req, res, next){
    res.send("login endpoint")
})
router.get("/logout", function(req, res, next){
    res.send("logout endpoint")
})

export default router;