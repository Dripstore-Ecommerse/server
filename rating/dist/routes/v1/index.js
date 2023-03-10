import express from "express";
import reviewRoute from "./reviews.route";
const router = express.Router();
const defaultIRoute = [
  {
    path: "/reviews",
    route: reviewRoute,
  },
];
defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});
export default router;
//# sourceMappingURL=index.js.map
