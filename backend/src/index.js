const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Order = require("./models/order");
const Plan = require("./models/plans");

const validateFieldsMiddleware = require('./validateFieldsMiddleware');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log("Running!")

app.get("/plans", async (req, res) => {
    const plans = await Plan.find();
    return res.status(200).json(plans)
});

app.post("/plan", validateFieldsMiddleware(['name', 'speedNumber', 'prefix', 'price']), async (req, res) => {
    const newPlan = new Plan({ ...req.body });

    const insertedPlan = await newPlan.save();
    return res.status(201).json(insertedPlan);
});

app.put("/plan/:id", validateFieldsMiddleware(['name', 'speedNumber', 'prefix', 'price']), async (req, res) => {
    const { id } = req.params;
    await Plan.updateOne({ _id: id }, req.body);
    const updatedPlan = await Plan.findById(id);
    return res.status(200).json(updatedPlan);
});

app.delete("/plan/:id", async (req, res) => {
    const { id } = req.params;
    const deletedPlan = await Plan.findByIdAndDelete(id);
    return res.status(200).json(deletedPlan);
});

app.get("/orders", async (req, res) => {
    const orders = await Order.find();
    return res.status(200).json(orders)
});

app.post("/order", validateFieldsMiddleware(['customerName', 'customerEmail', 'customerPhone', 'planId']), async (req, res) => {
    const newOrder = new Order({ ...req.body });

    const insertedOrder = await newOrder.save();
    return res.status(201).json(insertedOrder);
});

app.put("/order/:id", validateFieldsMiddleware(['customerName', 'customerEmail', 'customerPhone', 'planId']), async (req, res) => {
    const { id } = req.params;
    await Order.updateOne({ _id: id }, req.body);
    const updatedOrder = await Order.findById(id);
    return res.status(200).json(updatedOrder);
});

app.delete("/order/:id", async (req, res) => {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    return res.status(200).json(deletedOrder);
});

const start = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://douglas:TLXDYZpVS6TYGm59@cluster0.z69u3sz.mongodb.net/?retryWrites=true&w=majority"
        );
        app.listen(3000, () => console.log("Server started on port 3000"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
