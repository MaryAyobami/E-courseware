const mongoose = require('mongoose')

const assignments = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    details:{
        type: String,
        required: false,
    },
    link:{
        type: String,
        required: false,
    },
    sender:{
        type: String,
        required: false,
    },
    department:{
        type: String,
        required: true,
    },
    level:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('assignment', assignments)