import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";
import { type } from "os";

const assestsSchema = new Schema(
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
            enum: ["draft", "published"],
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

export const Assests = mongoose.model("Assests", assestsSchema);
