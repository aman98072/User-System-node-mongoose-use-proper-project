const mongoose = require("mongoose");

// DB connection
const db = mongoose.connect("mongodb://localhost:27017/user_system" || process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( () => {
    console.log("Database connected...");
});

exports.module = db;