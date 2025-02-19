import express from "express"
import { activateUser, loginUser, logoutUser, registrationUser } from "../controller/user.controllers"
import { authorizeRoles, isAutheticated } from "../middleware/auth"
const userRouter = express.Router()

userRouter.post('/registration',registrationUser)
userRouter.post('/activate-user',activateUser)
userRouter.post('/login',loginUser)
userRouter.get('/logout',isAutheticated,authorizeRoles("admin") ,logoutUser)

export default userRouter
