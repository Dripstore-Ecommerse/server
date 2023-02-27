import express, { Router } from "express";
import { validate } from "../../modules/validate";
import { cartController, cartValidation } from "../../modules/cart";

const router: Router = express.Router();

router
  .route("/")
  .post(validate(cartValidation.createcart), cartController.createcart)
  .get(validate(cartValidation.getcarts), cartController.getcarts);

router
  .route("/:cartId")
  .get(validate(cartValidation.getcart), cartController.getcart)
  .patch(validate(cartValidation.updatecart), cartController.updatecart)
  .delete(validate(cartValidation.deletecart), cartController.deletecart);

export default router;
