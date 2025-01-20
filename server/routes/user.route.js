import express from 'express'
import {registerUserController,loginController} from '../controller/user'
const userRouter=express.Router()
userRouter.post('/register',registerUserController)
userRouter.post('/login',loginController)

export default userRouter;