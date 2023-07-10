const express = require("express");
const {UserModel} = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();

userRoute.get("/", async(req, res) => {
    const query = req.query;
    try {
        const data = await UserModel.find(query);
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

userRoute.post("/register", async(req, res) => {
    const payload = req.body;
    try {
        if (payload) {
            const {email, name, password, address} = payload;
            const existenceCheck = await UserModel.find({email});
            if (existenceCheck.length > 0){
                return res.send("User exist with this EmailID")
            }
            else {
                bcrypt.hash(password, 4, async function(err, hash) {
                    if (err) {
                        return res.send(err.message)
                    }
                    const newUser = new UserModel({name, email, password: hash, address})
                    await newUser.save();
                    res.send("Registration Successful");
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

userRoute.post("/login", async (req, res) => {
    try {
        const payload = req.body;
        if (payload) {
            const {email, password} = payload;
            const existenceCheck = await UserModel.find({email});
            if (existenceCheck) {
                bcrypt.compare(password, existenceCheck[0].password, function(err, result) {
                    if (result) {
                        const token = jwt.sign({userID: existenceCheck[0]._id, name: existenceCheck[0].name}, process.env.secret_key)
                        return res.send({"msg":"Login Successful", token: token})
                    }
                    else {
                        return res.send(err.message);
                    }
                })
            }
            else {
                return res.send("User Doesn't exist");
            }
        }
    } catch (error) {
        return res.send(error.message)
    }
})

userRoute.patch("/:id/reset", async (req, res) => {
    try {
        const payload = req.body;
        const _id = req.params.id;
        if (payload) {
            const {password, newPassword} = payload;
            const findingUser = await UserModel.findById({_id: _id});
            if (findingUser) {
                bcrypt.compare(password, findingUser.password, function (err, result) {
                    if (result) {
                        bcrypt.hash(newPassword, 4, async function (err, hash) {
                            if (err) {
                                return res.send(err.message);
                            }
                            findingUser.password = hash;
                            await findingUser.save();
                            return res.send("Password Changed");
                        })
                    }
                    else { return res.send(err.message)}
                })
            }
            else {
                return res.send("Unable to find an existing user against this id")
            }
        }
    } catch (error) {
        res.send(error.message);
    }
})



module.exports = {
    userRoute
}

