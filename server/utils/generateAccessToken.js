import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

//function to generate access token 
const generateAccessToken=(userId)=>{
    try {
        const token=jwt.sign(
            {id:userId},
            process.env.SECRET_KEY_ACCESS_TOKEN,
            {expiresIn:"5h"}
        );
        return token;
    } catch (error) {
        throw new Error('Failed to generate access token')
    }
}
export default generateAccessToken;