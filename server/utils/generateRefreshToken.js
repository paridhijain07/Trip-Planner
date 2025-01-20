import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userModel from '../models/user.model'
dotenv.config()
//funnction to generate refresh token 
const generateRefreshToken=(userId)=>{
    try {
        const token=jwt.sign(
            {id:userId},
            process.env.SECRET_KEY_REFRESH_TOKEN,
            {expiresIn:'30d'}
        )
        userModel.updateOne(
            {_id:userid},
            {refresh_token:token}
        )
        return token;
    } catch (error) {
        throw new Error("Failed to generate refresh token");
    }
    
}
export default generateRefreshToken;