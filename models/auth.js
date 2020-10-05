var mongoose = require("mongoose");
const authSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            maxlength: 50,
            trim: true
        },
        email: {
            type: String,
            require: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            trim: true
        } 
    },
    { timestamps: true }
);

module.exports = mongoose.model("admin", authSchema);
