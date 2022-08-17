import mongoose from "mongoose";
const URL = process.env.DATABASE_URL || "";
mongoose.connect(URL).
    then(()=>console.log('database connected'))
    .catch(error => console.log(error));