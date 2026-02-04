import  express from 'express';
const router = express.Router();

router.get("/signup", function(req, res, next){
    res.send("signup endpoint")
})
router.get("/login", function(req, res, next){
    res.send("login endpoint")
})
router.get("/logout", function(req, res, next){
    res.send("logout endpoint")
})

export default router;