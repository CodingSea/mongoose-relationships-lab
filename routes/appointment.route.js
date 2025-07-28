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

router.get("/:id", async (req, res) =>
{
    try
    {
        const foundAppointment = await Appointment.findById(req.params.id).populate("doctor");
        res.render("appointments/appointment-details.ejs", {foundAppointment});
    }
    catch(error)
    {
        console.log(error);
    }
});


router.put("/:id", async (req, res) =>
{
    try
    {
        let updatedAppointment = await Appointment.findById(req.params.id);
        const note = req.body;
        updatedAppointment.notes.push(note);
        updatedAppointment.save();
        res.redirect("/appointments/" + req.params.id);
    }
    catch(error)
    {
        console.log(error);
    }
});

router.delete("/:id", async (req, res) =>
{
    try
    {
        await Appointment.findByIdAndDelete(req.params.id);
    }
    catch(error)
    {
        console.log(error);
    }
});

module.exports = router;