import Joi from "joi";
import { objectId } from "../validate/custom.validation";

const createcartBody = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
};

export const createcart = {
  body: Joi.object().keys(createcartBody),
};

export const getcarts = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getcart = {
  params: Joi.object().keys({
    cartId: Joi.string().custom(objectId),
  }),
};

export const updatecart = {};

export const deletecart = {
  params: Joi.object().keys({
    cartId: Joi.string().custom(objectId),
  }),
};
