import express from 'express';
import { signup ,login,logout, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/v1/signup", signup);
router.post("/v1/login",login);
router.post("/v1/logout",logout);

router.put("/v1/update-profile", protectRoute,updateProfile);

router.get("/v1/check",protectRoute , (req , res)=>res.status(200).json(req.user));

export default router; 