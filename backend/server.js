const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const db = require("./database/db")



app.use(express.json());
app.use(cors({origin:"*"}))


app.use("/mains",require("./routes/main"))
app.use('/users',require("./routes/users")) //done



app.listen(process.env.PORT,async ()=>{
    await db();
    console.log(`Servers up on port ${process.env.PORT}`)
})