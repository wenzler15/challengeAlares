const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    speedNumber: {
        type: Number,
        required: true
    },
    wifi: {
        type: Boolean,
        required: false
    },
    games: {
        type: Boolean,
        required: false
    },
    movies: {
        type: Boolean,
        required: false
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    prefix: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Plan = mongoose.model("Plan", PlanSchema);

module.exports = Plan;