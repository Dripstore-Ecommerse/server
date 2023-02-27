import httpStatus from "http-status";
import mongoose from "mongoose";
import cart from "./cart.model";
import ApiError from "../errors/ApiError";
import { IOptions, QueryResult } from "../paginate/paginate";
import {
  NewCreatedCart,
  UpdateCartBody,
  ICart,
  NewRegisteredCart,
} from "./cart.interfaces";

/**
 * Create a cart
 * @param {NewCreatedCart} cartBody
 * @returns {Promise<ICart>}
 */
export const createCart = async (cartBody: NewCreatedCart): Promise<ICart> => {
  return cart.create(cartBody);
};

/**
 * Register a cart
 * @param {NewRegisteredCart} cartBody
 * @returns {Promise<ICart>}
 */
export const registerCart = async (
  cartBody: NewRegisteredCart
): Promise<ICart> => {
  return cart.create(cartBody);
};

/**
 * Query for carts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryCarts = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const carts = await cart.paginate(filter, options);
  return carts;
};

/**
 * Get cart by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ICart | null>}
 */
export const getCartById = async (
  id: mongoose.Types.ObjectId
): Promise<ICart | null> => cart.findById(id);

/**
 * Get cart by email
 * @param {string} email
 * @returns {Promise<ICart | null>}
 */
export const getCartByEmail = async (email: string): Promise<ICart | null> =>
  cart.findOne({ email });

/**
 * Update cart by id
 * @param {mongoose.Types.ObjectId} cartId
 * @param {UpdateCartBody} updateBody
 * @returns {Promise<ICart | null>}
 */
export const updateCartById = async (
  cartId: mongoose.Types.ObjectId,
  updateBody: UpdateCartBody
): Promise<ICart | null> => {
  const cart = await getCartById(cartId);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, "cart not found");
  }

  Object.assign(cart, updateBody);
  await cart.save();
  return cart;
};

/**
 * Delete cart by id
 * @param {mongoose.Types.ObjectId} cartId
 * @returns {Promise<ICart | null>}
 */
export const deleteCartById = async (
  cartId: mongoose.Types.ObjectId
): Promise<ICart | null> => {
  const cart = await getCartById(cartId);
  if (!cart) {
    throw new ApiError(httpStatus.NOT_FOUND, "cart not found");
  }
  await cart.remove();
  return cart;
};
