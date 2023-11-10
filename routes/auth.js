const router = require("express").Router()
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


// register user
router.post("/register", async (req,res)=> {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_KEY).toString()
    });

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

// login user 
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("user not found");

        // decrypt and compare password
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_KEY);
        const normalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        normalPassword !== req.body.password && res.status(401).json("wrong password");

        // create web token
        const accessToken = jwt.sign({
            userId: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_KEY, { expiresIn: "3d" });

        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken});
    } catch (error) {
     res.status(500).json(error)   
    }
})

module.exports = router