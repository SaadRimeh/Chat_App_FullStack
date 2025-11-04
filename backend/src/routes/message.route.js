import express from 'express';
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

const router = express.Router();
// Apply Arcjet protection and authentication middleware to all routes in this router
router.use(arcjetProtection,protectRoute);


// Define message-related routes
router.get("/v1/contacts",getAllContacts);
router.get("/v1/chats",getChatPartners);
router.get("/v1/:id", getMessagesByUserId);
router.post("/v1/send/:id", sendMessage);

export default router;