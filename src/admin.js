const mongoose = require('mongoose');

// creating a schema for image

// creating a schema for form 
const AdminSchema = new mongoose.Schema({
    image: Buffer,
    imageType: String,
    name: {
        type: String,
        required: true
    },
    Model: {
        type: String,
        required: true
    },
    NumberPlate: {
        type: String,
        required: true
    },
    MaxSpeed: {
        type: Number,
        required: true
    },
    Color: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: false
    },
    EngineType: {
        type: String,
        required: true
    },
});
// Admin Form part 
const AdminForm = new mongoose.model("admin", AdminSchema)

module.exports = AdminForm;