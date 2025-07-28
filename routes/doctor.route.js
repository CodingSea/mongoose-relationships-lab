const router = require("express").Router();
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

router.get("/", async (req, res) =>
{
    try
    {
        const allDoctors = await Doctor.find();
        res.render("doctors/doctor-list.ejs", {allDoctors});
    }
    catch(error)
    {
        console.log(error);
    }
});

router.get("/new", (req, res) =>
{
    res.render("doctors/doctor-new.ejs");
});

router.post("/new", async (req, res) =>
{
    try
    {
        await Doctor.create(req.body);
        res.redirect("/doctors");
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
        const selectedDoctor = await Doctor.findById(req.params.id);
        const appointments = await Appointment.find({doctor: req.params.id});
        res.render("doctors/doctor-details.ejs", {selectedDoctor, appointments});
    }
    catch(error)
    {
        console.log(error);
    }
});


module.exports = router;