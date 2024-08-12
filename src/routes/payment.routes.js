import { Router } from "express";
import {
    requestToBuyAsset,
    negotiatePurchaseRequest,
    acceptPurchaseRequest,
    denyPurchaseRequest,
    getUserPurchaseRequests
} from "../controllers/payment.controller.js";
import { varifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/purchase-request").post(varifyJWT, requestToBuyAsset);

router
    .route("/purchase-request/:id/negotiate")
    .put(varifyJWT, negotiatePurchaseRequest);

router
    .route("/purchase-request/:id/accept")
    .put(varifyJWT, acceptPurchaseRequest);
router
    .route("/purchase-request/:id/deny")
    .put(varifyJWT, denyPurchaseRequest);
router
    .route("/purchase-request/user")
    .get(varifyJWT, getUserPurchaseRequests);

export default router;
