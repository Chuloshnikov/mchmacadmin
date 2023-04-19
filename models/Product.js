import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String, required: true, maxlength: 60
    },
    description: {
        type: String, required: true, maxlength: 300
    },
    price: {
        type: Number, required: true,
    } 
});

export default mongoose.models.Product ||  mongoose.model('Product', ProductSchema)