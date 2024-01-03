const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    images: {type: [String], required: true},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, required: true},
    price: {type: Number, default:0},
    count: {type: Number},
    type: {type: String, required: true},
    features: {type: Object, default:{
        length: "",
        height: "",
        width: "",
        weight: "",
        colors: [],
        model: [],
        madein: ""
    }},

})
module.exports = {
    ProductModel: mongoose.model("product", ProductSchema)
}