const mongoose = require('mongoose');

const dbSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    
    surname: {
        type: String,
        required: true
    },
    
    age: {
        type: Number,
        required: true,
        default: 20
    }

});



module.exports = mongoose.model('data', dbSchema);