import express from "express";
import { validate } from "../../modules/validate";
import { reviewController, reviewValidation } from "../../modules/review";
const router = express.Router();
router
  .route("/")
  .post(validate(reviewValidation.createReview), reviewController.createReview)
  .get(validate(reviewValidation.getReviews), reviewController.getReviews);
router
  .route("/:reviewId")
  .get(validate(reviewValidation.getReview), reviewController.getReview)
  .patch(validate(reviewValidation.updateReview), reviewController.updateReview)
  .delete(
    validate(reviewValidation.deleteReview),
    reviewController.deleteReview
  );
export default router;
//# sourceMappingURL=reviews.route.js.map
