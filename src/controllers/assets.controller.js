import { asyncHandler } from "../utils/asyncHandler.js";
import { Assets } from "../models/assets.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createAsset = asyncHandler(async (req, res) => {
    const { name, description, status } = req.body;

    const existedAsset = await Assets.findOne({
        $or: [{ name }, { description }],
    });

    if (existedAsset) {
        throw new ApiError(409, "Asset is already existed");
    }

    if (!(name && description)) {
        throw new ApiError(400, "All fileds are required");
    }

    const imageLocalPath = req.files?.image[0]?.path;
    console.log(imageLocalPath);
    if (!imageLocalPath) {
        throw new ApiError(401, "Image Loacal path is required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
        throw new ApiError(401, "Failed to upload image on cloudinary");
    }

    const asset = await Assets.create({
        name,
        description,
        image: image.url,
        status,
        creator: req.user.userId,
        currentHolder: req.user.userId,
    });

    if (!asset) {
        throw new ApiError(500, "Error while creating the asset");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, asset, "Asset is successfully created"));
});

const publishAsset = asyncHandler(async (req, res) => {
    const asset = await Assets.findById(req.params.id);
    if (!asset) {
        throw new ApiError(404, "Asset not found");
    }

    if (asset.creator !== req.user.userId) {
        throw new ApiError(403, "Unauthorized request");
    }

    asset.status = "published";
    await asset.save();

    return res
        .status(201)
        .json(new ApiResponse(200, asset, "Asset successfully published"));
});

const unPublishAsset = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(404, "Id is required");
    }
    const asset = await Assets.findById(id);
    if (!asset) {
        throw new ApiError(404, "Asset not found");
    }

    if (asset.creator !== req.user.userId) {
        throw new ApiError(403, "You are not the creator of this asset");
    }

    asset.status = "unpublished";
    await asset.save();

    return res
        .status(201)
        .json(new ApiResponse(200, asset, "Asset unpublished successfully"));
});

const deleteAsset = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(404, "Id is required");
    }
    const asset = await Assets.findById(id);
    if (!asset) {
        throw new ApiError(404, "Asset not found");
    }

    if (asset.creator !== req.user.userId) {
        throw new ApiError(403, "You are not the creator of this asset");
    }

    await asset.remove;

    return res.status(201).json(
        new ApiResponse(
            200,

            "Asset deleted  successfully"
        )
    );
});

const getAssetDetails = asyncHandler(async (req, res) => {
    const asset = await Assets.findById(req.params.id).populate(
        "creator currentHolder"
    );
    if (!asset) {
        throw new ApiError(404, "Asset is not found");
    }
    return res
        .status(201)
        .json(
            new ApiResponse(200, asset, "Assets details fetched successfully")
        );
});

const getUserAssets = asyncHandler(async (req, res) => {
    const asset = await Assets.find({ creator: req.user.id });

    if (!asset) {
        throw new ApiError(404, "Error while feteching user assets details");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, asset, "User Assets fetched successfully"));
});

const tradeAsset = asyncHandler(async (req, res) => {
    const { assetId, newHolderId } = req.body;
    if (!(assetId && newHolderId)) {
        throw new ApiError(404, "AssetId and Holder Id is required");
    }

    const asset = await Assets.findById(assetId);

    if (!asset) {
        throw new ApiError(404, "Asset not found");
    }

    if (asset.currentHolder !== req.user.userId) {
        throw new ApiError(403, "You are not the current holder of this asset");
    }

    const newHolder = await User.findById(newHolderId);

    if (!newHolder) {
        throw new ApiError(404, "New holder not found");
    }

    //Transfer the asset to the new holder

    asset.tradingHistory.push({ holder: newHolder._id });
    asset.currentHolder = newHolder._id;

    await asset.save();

    return res
        .status(200)
        .json(new ApiResponse(201, "Asset trade successfully ", asset));
});

const getMarketplaceAssets = asyncHandler(async (req, res) => {
    const asset = await Assets.find({
        status: "published",
    }).populate("creator currentHolder");

    if (!asset) {
        throw new ApiError(404, "Can not find asset on marketplace");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                asset,
                "Successfully fetched asset on market place"
            )
        );
});

const getTradingHistory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const asset = await Assets.findById(id).populate("tradingHistory.holder");

    if (!asset) {
        throw new ApiError(404, "Asset not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { tradingHistory: asset.tradingHistory },
                "Trading history fetched successfully"
            )
        );
});

export {
    createAsset,
    publishAsset,
    getAssetDetails,
    getUserAssets,
    tradeAsset,
    getMarketplaceAssets,
    unPublishAsset,
    deleteAsset,
    getTradingHistory,
};
