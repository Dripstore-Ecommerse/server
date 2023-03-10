import mongoose from "mongoose";
import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";
import { IReview, ReviewModel } from "./review.interfaces";

const reviewSchema = new mongoose.Schema<IReview>(
  {
    productId: { type: mongoose.Schema.Types.ObjectId },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        rating: { type: Number, default: 0, required: true },
        comment: { type: String, default: "" },
        image: { type: [String], default: [] },
      },
    ],
  },
  {
    timestamps: true,
  }
);

reviewSchema.plugin(toJSON);
reviewSchema.plugin(paginate);

const Review = mongoose.model<IReview, ReviewModel>("Review", reviewSchema);

export default Review;
