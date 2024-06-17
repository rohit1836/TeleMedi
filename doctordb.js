const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginCredentials")
.then(()=>{
    console.log('mongoose doctor connected');
})
.catch((e)=>{
    console.log('failed');
})

const doctorSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : [true, "email already exists"]
    },
    phoneno : {
        type : Number,
        required : true,
        unique : true
    },
    department : {
        type : String,
        enum : ["Cardiology","Neurology","Orthopedics","Pediatrics","Oncology"],
        default : "Cardiology",
        required : true
    },
    qualifications : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : [true, 'username already exists']
    },
    password : {
        type : String,
        required : true
    }
})


const DoctorCollection = new mongoose.model('DoctorCollection',doctorSchema)

module.exports = DoctorCollection;