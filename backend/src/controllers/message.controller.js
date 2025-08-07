import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';

export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId} }).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }    
};

export const getMessages = async (req, res) => {
    try{
        const {id:userToChatId}=req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }    
};

export const sendMessage = async (req, res) => {
    try{
        const {text, image } = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        if (!text && !image) {
            return res.status(400).json({ message: "Cannot send an empty message" });
        }
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            text: text || "",
            Image: imageUrl || ""
        });
 
        await newMessage.save();
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("error in sending message", error.message);
        res.status(500).json({ message: "Server Error" });
    }
}