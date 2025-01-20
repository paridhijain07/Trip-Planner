import userModel from '../models/user.model'
import bcrypt from 'bcrypt'
import generateAccessToken from '../utils/generateAccessToken';
import generateRefreshToken from '../utils/generateRefreshToken';


async function registerUserController(req,res){
    try {
        const {name,email,password}=req.body;
        //to validate that all three fileds are provided
        if(!name||!email||!password){
            return res.status(400).json({
                message:'All three fields must be provided',
                error:true,
                success:false,
            })
        }
        //if everything is provided as asked then
        const user=await userModel.findOne({email});
        if(user){
            return res.status(409).json({
                message:'User already registered',
                error:true,
                success:false,
            })
        }
        //else create the new user 
        //hashing the password
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)
        const newUser=new userModel({name,email,password:hashPassword})
        const save=newUser.save()
        //email verification logic comes here


        return res.status(201).json({
            message:'User registered successfully',
            success:true,
            error:false,
            data:save,
        })

    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message:error.message,
            error:true,
            success:false,
        })
    }
}
//code for verifyEmailController
//loginController
async function loginController(req,res){
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                message:'Both fields must be provided',
                error:true,
                success:false,
            })
        }
        //if both fileds provided correctly
        const user= await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message: 'User not registered',
                error: true,
                success: false,
            });
        }
        const checkPassword=await bcrypt.compare(password,user.password)
        if (!checkPassword) {
            return res.status(400).json({
                message: 'Incorrect password',
                error: true,
                success: false,
            });
        }
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        const cookieOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'None',
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days expiry
        };
        res.cookie('accessToken',accessToken,cookieOption)
        res.cookie('refreshToken',refreshToken,cookieOption)
        return res.json({
            message:'Login successful',
            error:false,
            success:true,
            data:{
                accessToken,
                refreshToken
            },
        })


    } 
    catch (error) {
        return res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })
    }
}

export default {registerUserController,loginController}

