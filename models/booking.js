const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        userInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        mentorInfo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor",
        },
        eventId: {
            type: String, 
        },
        startTime: {
            type: String, 
        },
        endTime: {
            type: String, 
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
