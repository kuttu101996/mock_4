const express = require("express");
const {OrderModel} = require("../models/order.model")

const orderRoute = express.Router();

orderRoute.get("/:id", async (req,res) =>{
    try {
        const _id = req.params.id;
        const order = await OrderModel.findById({_id});
        return res.send(order);
    } catch (error) {
        return res.send(error);
    }
})

orderRoute.post("/", async (req, res) => {
    try {
        const payload = req.body;
        const order = new OrderModel(payload);
        await order.save();
        return res.send(order);
    } catch (error) {
        return res.send(error);
    }
})

orderRoute.patch("/:id", async (req, res) => {
    const _id = req.params.id;
    const payload = req.body;
    try {
        const updateData = await User.findByIdAndUpdate(_id, payload);
        if (!updateData){
            return res.send("Order not found ")
        }
        return res.send("Order status updated Success")
    } catch (error) {
        return res.send(error);
    }
})



module.exports = {
    orderRoute
}