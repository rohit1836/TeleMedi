const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/LoginCredentials")
.then(()=>{
    console.log('mongoose patient connected');
})
.catch((e)=>{
    console.log('failed');
})

const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true,
        unique : [true, 'email already exists']
    },
    username:{
        type: String,
        required : true,
        unique : [true, 'username already exists']
    },
    password:{
        type:String,
        required : true
    }
})

const LogInCollection = new mongoose.model('LogInCollection',patientSchema)

module.exports= LogInCollection