
require("dotenv").config();
const User = require("../models/User");

const jwt = require('jsonwebtoken')

exports.isAuthentication = async (req, res, next) => {

    const token = req.header("Auth")
    console.log("token", token)
    if (!token) return res.status(401).json({ message: "Login First" })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const id = decoded.userId
    const user = await User.findById(id)
    if (!user) return res.status(401).json({ message: "User not found" })

    //save user in req.user globally to access user in other routes
    req.user = user
    next()


    // console.log("cookies:", req.cookies);
    // console.log("header:", req.header("Authorization"));
    // console.log("body:", req.body);


    // const token =
    //     req.body.token ||
    //     req.cookies.token ||
    //     req.header("Authorization").replace("Bearer", "");
}