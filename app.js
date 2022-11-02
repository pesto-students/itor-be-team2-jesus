const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())




app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);



//morgan middleware
app.use(morgan("tiny"));

//import all routes here
const home = require("./routes/home");
const user = require("./routes/user");
const mentor = require("./routes/mentor");
const auth = require("./routes/auth");
const booking = require("./routes/booking");
const post = require("./routes/post");




//router middleware
app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1", mentor);
app.use("/api/v1", auth);
app.use("/api/v1", booking);
app.use("/api/v1", post);








module.exports = app;