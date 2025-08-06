import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from '../lib/cloudinary.js';

export const signup= async(req, res) => {
    const { email, fullName, password, profilePic } = req.body;
    try{
        if(!email || !fullName || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const user= await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ email, fullName, password: hashedPassword, profilePic });
       if(newUser) {
          //jwt
          generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic,
                // message: "User created successfully"
             });

        }
        else{
            res.status(400).json({ message: "Invalid User Data" });
                profilePic: newUser.profilePic
    }
}
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        if(!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        //jwt
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic,
            // message: "Login successful"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
        
    }
export const logout = (req, res) => {               
   try{
    res.clearCookie('jwt');
    res.status(200).json({ message: "Logout successful" });
   }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
   }
};

export const updateProfile=async(req, res) => {
    try {   
        const { profilePic }= req.body;
        const userId = req.user._id;
        if(!profilePic) {
            return res.status(400).json({ message: "Please provide a profile picture" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error(error);   
        res.status(500).json({ message: "Server Error" });
    }
};

export const checkAuth = (req, res) => {    
    try{
        res.status(200).json(req.user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}; 