import { Document, Model, Schema } from "mongoose";
import { QueryResult } from "../paginate/paginate";

export interface IUserReview {
  userId: Schema.Types.ObjectId;
  rating: number;
  comment: string;
  image: string[];
}

export interface IReview extends Document {
  productId: Schema.Types.ObjectId;
  averageRating: number;
  totalReviews: number;
  reviews: IUserReview[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewModel extends Model<IReview> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export type UpdateReviewBody = Partial<IReview>;

// export type NewRegisteredReview = Omit<IReview, "updatedAt" | "slug">;
export type NewRegisteredReview = IReview;

// export type NewCreatedReview = Omit<IReview, "updatedAt">;
export type NewCreatedReview = IReview;
