
const User = require('../models/User')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const bcrypt = require('bcryptjs')
exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        let userExist =
            await User.findOne({ email: email })
        //findOne() is a method that is used to find the first document that matches the query criteria
        if (userExist) {    //if user already exists
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        //if user does not exist

        //bcrypt the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log("hashedPassword", hashedPassword)

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        user.save()
        //why we use save()
        //save() is used to save the data in the database


        res.status(201).json({
            success: true,
            user,
            message: "User created successfully"
        })

    } catch (error) {
        console.error(error)
        res.status(400).json({
            error: error.message,
            status: false,
            message: "something went wrong"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        //if user exists

        //compare the password
        const isMatch = await bcrypt.compare(password, user.password)
        console.log("isMatch", isMatch)

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        //saving token 
        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })



        res.status(200).json({
            success: true,
            token: token,
            message: "User logged in successfully"
        })

    } catch (error) {
        console.error(error)
        res.status(400).json({
            error: error.message,
            status: false,
            message: "something went wrong"
        })
    }
}