import mongoose from "mongoose";
const PlaceSchema = new mongoose.Schema({
    owner : {type : mongoose.Schema.Types.ObjectId , ref : 'User'},
    title : String,
    address : String,
    photos : [String],
    description : String,
    perks:[String],
    extraInfo : String,
    checkIn : String,
    checkOut : String,
    maxGuests : Number,
    mainImage:String,
    price:Number,
});

const Places = mongoose.model('Places',PlaceSchema);
export default Places;