const mongoose = require('mongoose')

const activities = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    resourceId:{
        type: String,
        required: true,
    },
    resourceName:{
        type: String,
        required: true,
    },
    sender:{
        type: String,
        required: true,
    },
   
})

module.exports = mongoose.model('activities',activities)