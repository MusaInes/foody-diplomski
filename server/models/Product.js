const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    selectedMeal: [{
      type: mongoose.Schema.Types.Mixed
    }],
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = Products = mongoose.model('product', ProductSchema);
