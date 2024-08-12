import { Payment } from "../models/purchaseRequest.models.js";
import { User } from "../models/user.models.js";
import { Assets } from "../models/assets.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const requestToBuyAsset = asyncHandler(async (req, res) => {
    const { assetId, offerPrice} = req.body;
    const buyerId = req.user.userId;
    console.log(buyerId)

    const asset = await Assets.findById(assetId).populate("currentHolder");

    if (!asset) {
        throw new ApiError(404, "Asset not found");
    }

    if (asset.currentHolder._id.toString()=== buyerId) {
        throw new ApiError(400, "You already own this asset");
    }

    const purchaseRequest = new Payment({
        asset: assetId,
        buyer: buyerId,
        seller: asset.currentHolder._id,
        offerPrice,
        status: "pending",
    });

    await purchaseRequest.save();

    if (!purchaseRequest) {
        throw new ApiError(500, "Error while creating a purchase request");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                purchaseRequest,
                "Purschased request created successfully"
            )
        );
});

const negotiatePurchaseRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { counterOfferPrice } = req.body;
    const sellerId = req.user.userId;

    if (!sellerId) {
        throw new ApiError(404, "Invalid seller Id");
    }

    const purchaseRequest = await Payment.findById(id).populate("seller");

    if (!purchaseRequest) {
        throw new ApiError(404, "Purchase request not found");
    }

    if (purchaseRequest.seller._id !== sellerId) {
        throw new ApiError(403, "You are not the seller of this asset");
    }

    purchaseRequest.counterOfferPrice = counterOfferPrice;
    purchaseRequest.status = "negotiation";

    await purchaseRequest.save();

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                "counter-Offer sent successfully",
                purchaseRequest
            )
        );
});

const acceptPurchaseRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const sellerId = req.user.userId;

    if (!sellerId) {
        throw new ApiError(404, "Seller id is not valid");
    }

    const purchaseRequest =
        await Payment.findById(id).populate("asset buyer seller");
    if (!purchaseRequest) {
        throw new ApiError(404, "Purchase request not Found");
    }

    if (purchaseRequest.seller._id !== sellerId) {
        throw new ApiError(403, "You are not seller of this asset");
    }

    const asset = purchaseRequest.asset;
    asset.currentHolder = purchaseRequest.buyer._id;

    purchaseRequest.status = "accepted";

    await asset.save();

    await purchaseRequest.save();

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                purchaseRequest,
                "Purchase request accepted successfully"
            )
        );
});

const denyPurchaseRequest = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const sellerId = req.user.userId;

    if (!sellerId) {
        throw new ApiError(404, "Seller id is not valid");
    }

    const purchaseRequest = await Payment.findById(id).populate("seller");
    if (!purchaseRequest) {
        throw new ApiError(404, "Purchase request not Found");
    }

    if (purchaseRequest.seller._id !== sellerId) {
        throw new ApiError(403, "You are not seller of this asset");
    }

    const asset = purchaseRequest.asset;
    asset.currentHolder = purchaseRequest.buyer._id;

    purchaseRequest.status = "denied";

    await purchaseRequest.save();

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                purchaseRequest,
                "Purchase request denied successfully"
            )
        );
});


const getUserPurchaseRequests = asyncHandler(async(req, res)=>{
    const userId = req.user.userId;

    const purchaseRequest = await Payment.find({buyer : userId}).populate('asset seller');

    if(!purchaseRequest){
        throw new ApiError(402, "Does not get user request")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200,
            purchaseRequest,
            "User purchases requests fetched successfully"
        )
    )

})

export {
    requestToBuyAsset,
    negotiatePurchaseRequest,
    acceptPurchaseRequest,
    denyPurchaseRequest,
    getUserPurchaseRequests
};
