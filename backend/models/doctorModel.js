import mongoose from "mongoose"

const doctorSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    image:{type:String, required:true},
    speciality:{type:String, required:true},
    degree:{type:String, required:true},
    experience:{type:String, required:true},
    about:{type:String, required:true},
    available:{type: Boolean,default:true},
    fees: {type:Number,required:true},
    address:{type:Object,required:true},
    //whay address is a object
    date:{type:Number,required:true},
    slots_booked:{type:Object,default:{}}
},{minimize:false})//minimize false means we do not minimize the empty objects in the schema

const doctorModel=mongoose.models.doctor || mongoose.model('doctor',doctorSchema)
//if model is present then give it otherwise make a doctor model

export default doctorModel