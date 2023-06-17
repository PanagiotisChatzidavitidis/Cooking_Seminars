const mongoose = require('mongoose')

const SeminarSchema = mongoose.Schema({
    name:{
        type:String
    },
    lastname:{
        type:String
    }
})

module.exports = mongoose.model('Seminars',SeminarSchema)