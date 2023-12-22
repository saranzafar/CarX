const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    },
});
// order Form part 
const order = new mongoose.model("order", OrderSchema)

module.exports = order;