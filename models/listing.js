const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://media.istockphoto.com/id/178634742/photo/mountain-landscape.webp?b=1&s=170667a&w=0&k=20&c=6cHcsFb-I59ZQXoo3LCiuo8VBn_4VM33aevigAOLjiQ=",
        set: (v) => v === "" ? "https://media.istockphoto.com/id/178634742/photo/mountain-landscape.webp?b=1&s=170667a&w=0&k=20&c=6cHcsFb-I59ZQXoo3LCiuo8VBn_4VM33aevigAOLjiQ=" : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref :"Review"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;