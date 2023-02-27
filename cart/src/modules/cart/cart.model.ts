import mongoose from "mongoose";
import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";
import { ICart, cartModel } from "./cart.interfaces";

const cartSchema = new mongoose.Schema<ICart>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    total: { type: Number, default: 0 },
    coupon: { type: mongoose.Schema.Types.ObjectId, default: null },
  },
  {
    timestamps: true,
  }
);

cartSchema.plugin(toJSON);
cartSchema.plugin(paginate);

const cart = mongoose.model<ICart, cartModel>("cart", cartSchema);

export default cart;
