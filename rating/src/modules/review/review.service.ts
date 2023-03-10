import httpStatus from "http-status";
import mongoose from "mongoose";
import Review from "./review.model";
import ApiError from "../errors/ApiError";
import { IOptions, QueryResult } from "../paginate/paginate";
import {
  NewCreatedReview,
  UpdateReviewBody,
  IReview,
  NewRegisteredReview,
} from "./review.interfaces";

/**
 * Create a review
 * @param {NewCreatedReview} reviewBody
 * @returns {Promise<IReview>}
 */
export const createReview = async (
  reviewBody: NewCreatedReview
): Promise<IReview> => {
  return Review.create(reviewBody);
};

/**
 * Register a review
 * @param {NewRegisteredReview} reviewBody
 * @returns {Promise<IReview>}
 */
export const registerReview = async (
  reviewBody: NewRegisteredReview
): Promise<IReview> => {
  return Review.create(reviewBody);
};

/**
 * Query for reviews
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryReviews = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const reviews = await Review.paginate(filter, options);
  return reviews;
};

/**
 * Get review by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IReview | null>}
 */
export const getReviewById = async (
  id: mongoose.Types.ObjectId
): Promise<IReview | null> => Review.findById(id);

/**
 * Get review by email
 * @param {string} email
 * @returns {Promise<IReview | null>}
 */
export const getReviewByEmail = async (
  email: string
): Promise<IReview | null> => Review.findOne({ email });

/**
 * Update review by id
 * @param {mongoose.Types.ObjectId} reviewId
 * @param {UpdateReviewBody} updateBody
 * @returns {Promise<IReview | null>}
 */
export const updateReviewById = async (
  reviewId: mongoose.Types.ObjectId,
  updateBody: UpdateReviewBody
): Promise<IReview | null> => {
  const review = await getReviewById(reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review not found");
  }

  Object.assign(review, updateBody);
  await review.save();
  return review;
};

/**
 * Delete review by id
 * @param {mongoose.Types.ObjectId} reviewId
 * @returns {Promise<IReview | null>}
 */
export const deleteReviewById = async (
  reviewId: mongoose.Types.ObjectId
): Promise<IReview | null> => {
  const review = await getReviewById(reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review not found");
  }
  await review.remove();
  return review;
};
