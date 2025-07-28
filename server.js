const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const methodOverride = require("method-override");
const connectToDB = require("./config/db");

const doctorRoute = require("./routes/doctor.route");
const appointmentRoute = require("./routes/appointment.route");

app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));

app.use(methodOverride("_method"));

app.use(morgan("dev"));


connectToDB();

app.use("/doctors", doctorRoute);
app.use("/appointments", appointmentRoute);


const port = process.env.PORT;
app.listen(port, () =>
{
    console.log("listening to port " + port);
});