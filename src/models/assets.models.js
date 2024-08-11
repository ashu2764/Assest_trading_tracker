
import mongoose, { Schema } from "mongoose";


const assetsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String, //Cloudinary
            required: true,
        },
        status: {
            type: String,
            enum: ["draft", "published", "unpublished"],
            default: "draft",
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        currentHolder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        tradingHistory: [
            {
                holder: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

export const Assets = mongoose.model("Assets", assetsSchema);
