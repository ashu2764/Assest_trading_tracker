import { Router } from "express";
import {
    createAsset,
    publishAsset,
    getAssetDetails,
    getUserAssets,
    tradeAsset,
    getMarketplaceAssets,
    unPublishAsset,
    deleteAsset,
    getTradingHistory
} from "../controllers/assets.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { varifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/createAssets").post(
    varifyJWT,
    upload.fields([
        {
            name: "image",
            maxCount: 1,
        },
    ]),
    createAsset
);

router.route("/:id/publish").put(varifyJWT, publishAsset);
router.route("/:id").get(varifyJWT, getAssetDetails);
router.route("/users/:id/assets").get(varifyJWT, getUserAssets);
router.route("/trade").post(varifyJWT, tradeAsset);
router.route("/marketplace/assets").get(varifyJWT, getMarketplaceAssets);
router.route("/:id/unpublish").put(varifyJWT, unPublishAsset);
router.route("/assests/delete/:id").delete(varifyJWT, deleteAsset);
router.route("/:id/history").get(varifyJWT, getTradingHistory);

export default router;
