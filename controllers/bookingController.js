const Booking = require("../models/booking");

exports.createBooking = async (req, res) => {
   try {
      const booking = await Booking.create({
         userInfo: req.user,
         mentorInfo: req.params.id,
         eventId: "",
         startTime: "",
         endTime: "",
      });
      res.status(200).json({
         success: true,
         message: "booking successful!",
         booking,
      });
   } catch (error) {
      console.log(error);
   }
};
