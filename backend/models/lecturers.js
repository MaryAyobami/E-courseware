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

module.exports = mongoose.model('lecturer', lecturer)