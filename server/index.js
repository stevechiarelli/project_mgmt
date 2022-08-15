import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes.js";

const port = process.env.PORT || 5000;
const app = express();

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, () => { console.log("MongoDB connected successfully")});

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.listen(port, console.log(`Server running on port ${port}`));