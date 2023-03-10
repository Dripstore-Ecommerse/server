import httpStatus from "http-status";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import ApiError from "../errors/ApiError";
import pick from "../utils/pick";
import * as reviewService from "./review.service";
export const createReview = catchAsync(async (req, res) => {
  const review = await reviewService.createReview(req.body);
  res.status(httpStatus.CREATED).send(review);
});
export const getReviews = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "projectBy"]);
  const result = await reviewService.queryReviews(filter, options);
  res.send(result);
});
export const getReview = catchAsync(async (req, res) => {
  if (typeof req.params["reviewId"] === "string") {
    const review = await reviewService.getReviewById(
      new mongoose.Types.ObjectId(req.params["reviewId"])
    );
    if (!review) {
      throw new ApiError(httpStatus.NOT_FOUND, "Review not found");
    }
    res.send(review);
  }
});
export const updateReview = catchAsync(async (req, res) => {
  if (typeof req.params["reviewId"] === "string") {
    const review = await reviewService.updateReviewById(
      new mongoose.Types.ObjectId(req.params["reviewId"]),
      req.body
    );
    res.send(review);
  }
});
export const deleteReview = catchAsync(async (req, res) => {
  if (typeof req.params["reviewId"] === "string") {
    await reviewService.deleteReviewById(
      new mongoose.Types.ObjectId(req.params["reviewId"])
    );
    res.status(httpStatus.NO_CONTENT).send();
  }
});
//# sourceMappingURL=review.controller.js.map
