//import Message from '../models/message.js';
import User from '../models/User.js';
import Message from '../models/Message.js';
export const getAllContacts = async (req, res) => {
try{
const loggedInUserId = req.user._id;
const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select("-password");

res.status(200).json(filteredUsers);


}catch(error){
console.log("Error fetching contacts:", error);
res.status(500).json({message: "Server error"});
}
 };


 export const getMessagesByUserId=async(req, res)=>{

try{
const myId= req.user._id;
const {id: userToChatId}= req.params;
// Logic to fetch messages between myId and userToChatId

const messages= await Message.find({
  $or: [
    { senderId: myId, receiverId: userToChatId },
    { senderId: userToChatId, receiverId: myId }
  ]
}).sort({ createdAt: 1 }); // Sort messages by creation time in ascending order 

res.status(200).json(messages);

}catch(error){
console.log("Error fetching messages:", error.Message);
res.status(500).json({message: "Internal Server error"});
}

 };


 export const sendMessage =async(req,res)=>{
try{
const {text, image} = req.body;
const senderId = req.user._id;
const {id: receiverId} = req.params;

let imageUl;
if(image){
    // Upload image to Cloudinary and get the URL
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUl = uploadResponse.secure_url;
}

const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUl,
});
await newMessage.save();

//todo: send message to receiver if online using socket.io  


res.status(201).json(newMessage);

}catch(error){
console.log("Error sending message:", error.message);
res.status(500).json({message: "Internal Server error"});
}
 };

 export const getChatPartners = async(req , res)=>{

try{
const loggedInUserId = req.user._id;
const messages = await Message.find({
    $or: [
        { senderId: loggedInUserId },
        { receiverId: loggedInUserId }
    ]
});
const chatPartnerIds =[
  ...new Set(
 messages.map((msg) =>
   msg.senderId.toString() === loggedInUserId.toString() 
? msg.receiverId.toString() 
: msg.senderId.toString()  )
),
];
const chatPartners=await User.find({_id: {$in: chatPartnerIds}}).select("-password");
res.status(200).json(chatPartners);
}catch(error){

console.log("Error fetching chat partners:", error.message);
res.status(500).json({message: "Internal Server error"});

}

 };