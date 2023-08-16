import mongoose from "mongoose";

// review schema
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // name of reviewer
    rating: { type: Number, required: true }, // rating given by reviewer
    comment: { type: String, required: true },
    // comment given by reviewer
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // user who created the review
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // user who created the product
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true }, // image url
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true }, // product description
    reviews: [reviewSchema], // array of review objects
    rating: { type: Number, required: true, default: 0 }, // average rating
    numReviews: { type: Number, required: true, default: 0 }, // number of reviews
    price: { type: Number, required: true, default: 0 }, // price in dollars
    countInStock: { type: Number, required: true, default: 0 }, // number of items in stock
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
