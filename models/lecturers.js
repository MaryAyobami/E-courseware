const mongoose = require('mongoose')

const lecturer = mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 3,
        max:100
    },
    
    department:{
        type: Array,
        required: true
    },
    college:{
        type: Array,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        min:6
    },
    token:{
        type: String,
        required: true,
       
    },
   
})

module.exports = mongoose.model('lecturer', lecturer)