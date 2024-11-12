const mongoose = require('mongoose');

const connectDB =async ()=>{
    await mongoose.connect(
    "mongodb+srv://Ish:fAij3OHE9ubDDI0f@devmeet.6vjpr.mongodb.net/Devmeet"
    );
};

module.exports = connectDB;


