import { Document, Model, Schema } from "mongoose";
import { QueryResult } from "../paginate/paginate";

export interface ICart extends Document {
  userId: Schema.Types.ObjectId;
  products: Schema.Types.ObjectId[];
  coupon: Schema.Types.ObjectId;
  total: number;
}

export interface cartModel extends Model<ICart> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export type UpdateCartBody = Partial<ICart>;

// export type NewRegisteredCart = Omit<ICart, "updatedAt" | "slug">;
export type NewRegisteredCart = ICart;

// export type NewCreatedCart = Omit<ICart, "updatedAt">;
export type NewCreatedCart = ICart;
