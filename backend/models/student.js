const mongoose = require('mongoose')

const student = mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 3,
        max:100
    },
    
    department:{
        type: String,
        required: true
    },
    college:{
        type: String,
        required: true
    },
    level:{
        type: Number,
        required: true
    },
    matricnumber:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    displayname:{
        type: String,
        required: false,
    },
    password:{
        type: String,
        required: true,
        min:6
    },
    bookmarks:{
        type: Array,
        required: false
    }
})

module.exports = mongoose.model('student',student)