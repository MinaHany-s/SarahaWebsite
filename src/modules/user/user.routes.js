import { Router } from "express";
import * as UC from "./user.controller.js";
import * as UV from "./user.validation.js";
import validate from "../../middleware/validate.js";


const userRouter = Router()

userRouter.get('/', UC.SignUp)

userRouter.post('/',
    validate(UV.signUpValidation),
    UC.handleSignUp
)

userRouter.get('/login', UC.login)
userRouter.post('/login',
    validate(UV.loginValidation),
    UC.handleLogin)


userRouter.get('/logOut', UC.logOut)

userRouter.get('/home', UC.home)

userRouter.get('/updateProfile', UC.editProfile)

userRouter.post('/updateProfile',
    validate(UV.updateValidation),
    UC.updateProfile)



export default userRouter