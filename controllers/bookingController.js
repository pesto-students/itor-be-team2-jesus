const Booking = require("../models/booking");
// const axios = require('axios').default;

exports.createBooking = async (req, res) => {
   try {
      // const { data } = req.body;
      // console.log(data.event.uri);
      // let URL = data.event.uri;



      // axios
      //    .get(URL)
      //    .then((response) => {
      //       response.json()
      //    })
      //    .then(data => console.log(data))
      //    .catch((error) => {
      //       console.log(error);
      //    });

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
