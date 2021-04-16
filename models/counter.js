const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    userID: String,
    title: String,
    count: int
});


module.exports = mongoose.model("Counter", CounterSchema);