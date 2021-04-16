const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    userID: String,
    title: String,
    count: Number
});


module.exports = mongoose.model("Counter", CounterSchema);