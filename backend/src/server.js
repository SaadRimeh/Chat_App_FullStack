import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';


dotenv.config();
const app = express();
// Get the absolute path of the current directory
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

//make ready for deployment
// If the app is running in production mode

if(process.env.NODE_ENV === 'production'){
    // Serve the static frontend files from the "dist" folder inside the frontend directory

 app.use(express.static(path.join(__dirname , "../frontend/dist")));

 // For any route that is not handled by the backend API
 app.get("*", (_, res) => {
    // Send back the main index.html file from the frontend's dist folder

    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
 });
}

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}` );
  connectDB();
});

