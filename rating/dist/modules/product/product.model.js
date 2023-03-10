import mongoose from "mongoose";
import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
reviewSchema.plugin(toJSON);
reviewSchema.plugin(paginate);
const Review = mongoose.model("Review", reviewSchema);
export default Review;
//# sourceMappingURL=review.model.js.map
