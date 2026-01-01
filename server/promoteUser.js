import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";

dotenv.config();

const promoteUser = async (email) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOneAndUpdate({ email }, { role: 'instructor' }, { new: true });
        if (user) {
            console.log(`User ${email} promoted to instructor.`);
            console.log(JSON.stringify(user, null, 2));
        } else {
            console.log(`User ${email} not found.`);
        }
        await mongoose.disconnect();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

promoteUser('admin_new@test.com');
