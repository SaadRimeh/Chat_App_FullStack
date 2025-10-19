import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';




export const signup =  async (req, res) => {
const {fullName, email, password} = req.body;

try{
    //validate input

    if(!fullName || !email || !password){
    
        return res.status(400).json({message: "All fields are required"});
    }
    //check password length
    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters long"});
    }
    //check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({message: "Invalid email address"});
}


//check if email already exists
const user = await User.findOne({email: email});

//if user exists
if(user){
    return res.status(400).json({message: "Email is already registered"});

}

//hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);


const newUser = new User({
    fullName,
    email,
    password: hashedPassword,       
});


//generate token and save user
if(newUser){
generateToken(newUser._id, res);
await newUser.save();
res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,   
    profilePic: newUser.profilePic,

});

//todo: send welcome email to new users
}
else{
    return res.status(400).json({message: "Invalid user data"});
}
}
catch (error) {
  console.error("Signup error:", error);
  res.status(500).json({ message: "Server error" });    
};

};
