const mongoose = require('mongoose')

const resources = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    link:{
        type: String,
        required: true,
    },
    sender:{
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    level:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    }
   
})

module.exports = mongoose.model('resource',resources)