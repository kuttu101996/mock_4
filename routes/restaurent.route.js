const express = require("express");
const {RestaurentModel, MenuModel} = require("../models/restaurent.model")

const restaurentRoute = express.Router();

restaurentRoute.get("/", async(req, res) => {
    const query = req.query;
    try {
        const data = await RestaurentModel.find(query);
        res.send(data);
    } catch (error) {
        res.send(error);
    }
})

restaurentRoute.get("/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const data = await RestaurentModel.findById({_id});
        return res.send(data);
    } catch (error) {
        return res.send(error)
    }
})

restaurentRoute.get("/:id/menu", async (req, res) => {
    const _id = req.params.id
    try {
        const data = await RestaurentModel.findById({_id});
        return res.send(data.menu);
    } catch (error) {
        return res.send(error)
    }
})

restaurentRoute.post("/:id/menu", async (req, res) => {
    const _id = req.params.id;
    const payload = req.body;
    try {
        const data = await RestaurentModel.findById({_id});
        const newMenu = new MenuModel(payload);
        data.menu.push(newMenu);
        await data.save();
        return res.send(data);
    } catch (error) {
        return res.send(error)
    }
})

restaurentRoute.delete("/:id/menu/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const deleteMenu = await MenuModel.findByIdAndDelete({_id});
        if (!deleteMenu) {
            return res.send("Unable to find menu")
        }
        return res.send("Menu deletion success");
    } catch (error) {
        return res.send(error)
    }
})




module.exports = {
    restaurentRoute
}