var mongoose = require('mongoose');

let reviewSchema = mongoose.Schema({
    rating: {
        type: Number, 
        required: true,
        max: 5, 
        min: 0
    },
    name: String,
    date: {type: Date, "default": Date.now},
    text: String
});

let locationSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: true
    },
    address: String,
    rating: {
        type: Number, 
        "default": 0,
        min: 0,
        max: 5
    },
    facilities: [String],
    coords: {
        type: [Number], 
        index: '2dsphere'
    },
    openingHours: [String],
    reviews: [reviewSchema] 
})

mongoose.model('location', locationSchema);
