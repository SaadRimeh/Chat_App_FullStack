import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const protectRoute=async(req , res, next)=>{
try{
const token = req.cookies.jwt;
if(!token){
    return res.status(401).json({message: "Unauthorized , no token provided"});
}
const decoded = jwt.verify(token, process.env.JWT_SECRET);
if(!decoded){
    return res.status(401).json({message: "Unauthorized , invalid token"});
}

    const user= await User.findById(decoded.userId).select("-password");
    if(!user){
        return res.status(401).json({message: "Unauthorized , user not found"});
    };
req.user = user;

    next();
}catch(err){
    console.log("Error in protectRoute middleware:", err);
    return res.status(500).json({message: "Internal Server Error"});

   };
};
//middleware to protect routes
//checks for valid jwt token in cookies
//if valid, attaches user to req object and calls next()
//if invalid, sends 401 Unauthorized response