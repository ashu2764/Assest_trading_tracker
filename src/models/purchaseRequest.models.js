import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
    {
        asset: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assets",
            required: true,
        },

        buyer: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        offerPrice: {
            type: Number,
            required: true,
        },
        counterOfferPrice: {
            type: Number,
        },
        status: {
            type: String,
            enum: ["pending", "negotiation", "accepted", "denied"],
            default: "pending",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
