import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 2,
        max: 100,
    },
    email: {
        type: String,
        require: true,
        max: 320,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 5,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: { type: String, enum: ["user", "admin", "superadmin"], default: "admin" },

}, { timestamps: true });

const User = mongoose.model("Users", UserSchema);

export default User;