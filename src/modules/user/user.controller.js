import messageModel from "../../../db/models/message.model.js"
import userModel from "../../../db/models/user.model.js"
import bcrypt from 'bcrypt'


export const SignUp = async (req, res, next) => {
    try {
        const { error } = req.query
        return res.render("signUp", { error })
    } catch (error) {
        return res.render("signup", { error: "Something went wrong" });
    }
}
export const handleSignUp = async (req, res, next) => {
    try {
        const { userName, email, password, cPassword } = req.body
        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.redirect("/?error=Email already exists. Try Login or resetting your password .");
        }
        await userModel.create({
            name: userName,
            email,
            password: bcrypt.hashSync(password, +process.env.SALT_ROUNDS),
        })

        return res.redirect('/login')
    } catch (error) {
        return res.render("signup", { error: "Something went wrong" });
    }

}

export const login = async (req, res, next) => {
    try {
        const { error } = req.query
        return res.render("login", { error })
    } catch (error) {
        return res.render("signup", { error: "Something went wrong" });
    }
}
export const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userExists = await userModel.findOne({ email })
        if (!userExists || !bcrypt.compareSync(password, userExists.password)) {
            return res.redirect("/login?error=Email not exists or password incorrect.");
        }

        var hour = 3600000
        req.session.cookie.expires = new Date(Date.now() + hour * 24)
        req.session.cookie.maxAge = hour
        req.session.userId = userExists._id
        req.session.loggedIn = true

        return res.redirect('/home')
    } catch (error) {
        return res.render("signup", { error: "Something went wrong" });
    }
}
export const home = async (req, res, next) => {
    try {
        const { error } = req.query
        const user = await userModel.findById(req.session.userId)

        const message = await messageModel.find({ to: user._id })
        const protocol = req.protocol; // 'http' or 'https'
        const host = req.hostname; // 'localhost' if running locally
        const port = req.connection.localPort; // Port number (e.g., 3000)
        let fullUrl
        if (port != 3000)
            fullUrl = `${protocol}://${host}/message/`;
        else {
            fullUrl = `${protocol}://${host}:${port}/message/`;

        }

        if (req.session.loggedIn)
            return res.render("home", { error, user, message, fullUrl })
        else
            return res.render("login", { error })

    } catch (error) {
        return res.render("signup", { error: "Something went wrong" });
    }
}




