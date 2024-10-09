const mongoose = require('mongoose');

const Schema = mongoose.Schema;



let productSchema = new Schema({
    product: {
        type: String,
        required: [true, 'Product-name is required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true
    },
    cost: {
        type: Number
        },
    description: {
        type: String,
        max: 100,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required field'],
  }},
  {
    collection: 'products',
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema)
