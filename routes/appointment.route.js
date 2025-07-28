const router = require("express").Router();
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

router.get("/", async (req, res) =>
{
    try
    {
        const allAppointments = await Appointment.find().populate("doctor");
        res.render("appointments/appointment-list.ejs", {allAppointments});
    }
    catch(error)
    {
        console.log(error);
    }
});

router.get("/new", async (req, res) =>
{
    try
    {
        const doctors = await Doctor.find();
        res.render("appointments/appointment-new.ejs", {doctors});
    }
    catch(error)
    {
        console.log(error);
    }
});

router.post("/new", async (req, res) =>
{
    try
    {
        await Appointment.create(req.body);
        res.redirect("/appointments");
    }
    catch(error)
    {
        console.log(error);
    }
});


module.exports = router;