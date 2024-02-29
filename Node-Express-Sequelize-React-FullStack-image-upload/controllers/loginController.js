const db = require('../models')

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

// model
const Admin = db.admin

// functions


const adminLogin = async (req, res) => {
    const { admin_email, admin_password } = req.body;
    console.log(admin_email);
    const userWithEmail = await Admin.findOne({
        where: {
            admin_email: admin_email
        }
    }).catch((err) => {
        console.log("Error :", err);
    });

    if (!userWithEmail) {
        return res.status(400).json({
            message: "Email or Password is Not Valid"
        });
    }

    if (userWithEmail.admin_password !== admin_password) {
        return res.status(400).json({
            message: "Email or Password is Not Valid"
        });
    }
    // const jwtToken = jwt.sign({ id: userWithEmail.admin_id, email: userWithEmail.admin_email }, JWT_SECRET);

    // res.cookie("token", jwtToken, {
    //     expires: new Date(Date.new() + 86400000),
    //     httpOnly: true,
    // })
    req.session.username = userWithEmail.admin_username
    console.log(req.session.username);
    res.status(200).json({

        message: "Welcome Back",
        // username: req.session.username
    });
}

const checkUser = async (req, res) => {
    console.log(req.session.username)
    if (req.session.username) {
        return res.status(200).json({ valid: true, username: req.session.username })
    } else {
        return res.status(404).json({ valid: false })
    }
}

module.exports = {
    adminLogin,
    checkUser
}