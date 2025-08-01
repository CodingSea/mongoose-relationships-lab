const mongoose = require("mongoose");

async function connectToDB()
{
    try
    {
        await mongoose.connect(process.env.DB_URI);
        console.log("connected to db");
    }
    catch(error)
    {
        console.log(error);
    }
}

module.exports = connectToDB;