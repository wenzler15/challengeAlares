const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    planId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "IN PROGRESS"
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;