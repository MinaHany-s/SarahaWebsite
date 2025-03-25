import express from 'express'
import userRouter from './src/modules/user/user.routes.js'
import dbConnection from './db/dbConnection.js'
import dotenv from 'dotenv';
import session from "express-session";
import MongoDBStoreFactory from "connect-mongodb-session";
import messageRouter from './src/modules/messages/message.routes.js';

const MongoDBStore = MongoDBStoreFactory(session);



const app = express()
const port = 3000

var store = new MongoDBStore({
    uri: process.env.DATABASE_URL_ONLINE,
    collection: 'mySessions'
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store
}))

dotenv.config();

dbConnection
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


app.use('/message', messageRouter)
app.use('/', userRouter)

app.set("view engine", "ejs");

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ msg: "error", error: error.message })

    next()
})


