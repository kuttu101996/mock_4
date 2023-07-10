const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

const {connection} = require("./db") 
const {userRoute} = require("./routes/userRoute")
const {restaurentRoute} = require("./routes/restaurent.route")
const {orderRoute} = require("./routes/order.route")

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello")
})

app.use("/user", userRoute);
app.use("/restaurents", restaurentRoute)
app.use("/orders", orderRoute)

app.listen(process.env.port, async() => {
    try {
        await connection;
        console.log("Connected to DB");
        console.log("Server is running at port 7777");
    } catch (error) {
        console.log(error);
    }
})