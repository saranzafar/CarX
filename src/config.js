const mongoose = require('mongoose');


const connect = mongoose.connect('mongodb://127.0.0.1:27017/Login-tut', {useUnifiedTopology: true });

connect.then((db) => {
    console.log('Database connected Successfully!', db.connection.host);
}).catch((err) => {
    console.log('Database can\'t be connected:', err);
});

// creating a schema 
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
// collection part 
const collection = new mongoose.model("users", LoginSchema)
module.exports = collection;


