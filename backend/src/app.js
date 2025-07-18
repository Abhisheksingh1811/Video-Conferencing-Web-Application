import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

// Configuration
app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Routes
app.use("/api/v1/users", userRoutes);

// MongoDB + Server Start
const start = async () => {
    try {
        const connectionDb = await mongoose.connect("mongodb+srv://AbhishekSingh:abhishek@cluster0.yzch0sq.mongodb.net/zoomapp?retryWrites=true&w=majority");

        console.log(`✅ MongoDB Connected: ${connectionDb.connection.host}`);

        server.listen(app.get("port"), () => {
            console.log(`🚀 Server listening on port ${app.get("port")}`);
        });

    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
};

start();
