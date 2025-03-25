import userModel from "../../../db/models/user.model.js";
import messageModel from "../../../db/models/message.model.js";




export const message = async (req, res, next) => {
    try {

        const { userId } = req.params
        const userExists = await userModel.findById(userId);
        if (!userExists) {
            return res.render("signup", { error: "User not found" });
        }
        return res.render("message", { user: userExists, error: "" });

    } catch (error) {
        return res.render("signup", { error: "Something went wrong" });
    }
}

export const messageSent = async (req, res, next) => {
    try {
        const { userId } = req.params
        const { content } = req.body
        const userExists = await userModel.findById(userId);
        if (!userExists) {
            return res.render("signup", { error: "User not found" });
        }
        await messageModel.create({
            content,
            to: userExists,
        })
        return res.render("messageSent");

    } catch (error) {
        console.log(error)
        return res.render("signup", { error: "Something went wrong" });
    }
}