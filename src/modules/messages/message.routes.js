import { Router } from "express";
import * as MC from "./message.controller.js";


const messageRouter = Router()

messageRouter.get('/:userId',
    MC.message
)
messageRouter.post('/:userId/messageSent',
    MC.messageSent
)






export default messageRouter