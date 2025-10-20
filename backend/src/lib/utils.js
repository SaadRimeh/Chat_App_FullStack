import jwt from 'jsonwebtoken';


export const generateToken=(userId , res)=>{

const {JWT_SECRET}= process.env;
if(!JWT_SECRET){
    throw new Error('JWT_SECRET is not defined in environment variables');
}

    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie("jwt", token, {
        httpOnly: true,//accessible only by web server prevent cross-site scripting attacks XSS attacks
        secure: process.env.NODE_ENV === "development" ? false : true,//https only in production
        sameSite: 'strict',//prevent CSRF attacks 
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return token;
};