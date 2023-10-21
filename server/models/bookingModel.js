import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    placeId:{type:mongoose.Schema.Types.ObjectId,required:true ,ref:'Places'},
    user:{type:mongoose.Schema.Types.ObjectId,required:true},
    checkIn:{type:Date , required:true},
    checkOut:{type:Date , required:true},
    numberOfGuests:{type:Number , required:true},
    name:{type:String , required:true},
    phoneNo:{type:String , required:true},
    price:{type:Number,required:true},
});

const Bookings = mongoose.model('Bookings',BookingSchema);
export default Bookings;