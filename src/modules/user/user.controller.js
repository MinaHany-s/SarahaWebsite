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
        return res.render("logIn", { error: "Please LogIn again" });
    }
}


export const editProfile = async (req, res, next) => {
    try {
        const error = req.query.error
        const user = await userModel.findById(req.session.userId)
        return res.render("editProfile", { error, user });
    } catch (error) {
        return res.render("signup", { error: "Something went wrong" });

    }
}


export const updateProfile = async (req, res, next) => {
    try {
        let { name, email, password } = req.body;
        const user = await userModel.findById(req.session.userId);

        if (!user) {
            return res.render("editProfile", { error: "User not found", user: {} });
        }

        let isUpdated = false;

        if (name && name !== user.name) {
            isUpdated = true;
            user.name = name;
        }

        if (email && email !== user.email) {
            const existingUser = await userModel.findOne({ email });
            if (existingUser && existingUser._id.toString() !== user._id.toString()) {
                return res.render("editProfile", { error: "Email already in use", user });
            }
            isUpdated = true;
            user.email = email;
        }

        if (password && !bcrypt.compareSync(password, user.password)) {
            isUpdated = true;
            user.password = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
        }

        if (!isUpdated) {
            return res.render("editProfile", { error: "Change something to update", user });
        }

        await user.save();
        return res.redirect('/home')

    } catch (error) {
        return res.render("editProfile", { error: "Something went wrong", user: {} });
    }
};



export const logOut = async (req, res, next) => {
    try {

        req.session.destroy((err) => {
            res.clearCookie("connect.sid"); 
        });
        return res.render("login", { error: "Logged out successfully" });


    } catch (error) {
        return res.render("signup", { error: "Something went wrong" });
    }
}
