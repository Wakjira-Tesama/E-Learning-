import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";

dotenv.config();

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({}, 'name email role');
        console.log(JSON.stringify(users, null, 2));
        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

listUsers();
