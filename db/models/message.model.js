import mongoose from "mongoose";

const messageSchema = mongoose.Schema({

    content: {
        type: String
    },
    to: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },

}, {
    timestamps: true,
});
const messageModel = mongoose.model("message", messageSchema)
export default messageModel