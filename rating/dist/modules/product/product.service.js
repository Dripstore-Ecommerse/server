import httpStatus from "http-status";
import Review from "./review.model";
import ApiError from "../errors/ApiError";
/**
 * Create a review
 * @param {NewCreatedReview} reviewBody
 * @returns {Promise<IReview>}
 */
export const createReview = async (reviewBody) => {
  return Review.create(reviewBody);
};
/**
 * Register a review
 * @param {NewRegisteredReview} reviewBody
 * @returns {Promise<IReview>}
 */
export const registerReview = async (reviewBody) => {
  return Review.create(reviewBody);
};
/**
 * Query for reviews
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryReviews = async (filter, options) => {
  const reviews = await Review.paginate(filter, options);
  return reviews;
};
/**
 * Get review by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IReview | null>}
 */
export const getReviewById = async (id) => Review.findById(id);
/**
 * Get review by email
 * @param {string} email
 * @returns {Promise<IReview | null>}
 */
export const getReviewByEmail = async (email) => Review.findOne({ email });
/**
 * Update review by id
 * @param {mongoose.Types.ObjectId} reviewId
 * @param {UpdateReviewBody} updateBody
 * @returns {Promise<IReview | null>}
 */
export const updateReviewById = async (reviewId, updateBody) => {
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
export const deleteReviewById = async (reviewId) => {
  const review = await getReviewById(reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, "Review not found");
  }
  await review.remove();
  return review;
};
//# sourceMappingURL=review.service.js.map
