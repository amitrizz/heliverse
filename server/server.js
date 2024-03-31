import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from './config/connectdb.js';
import router from './routes/DashBoardRoutes.js';
import fs from "fs"
import DataModel from './models/DashBoard.js';
import teamrouter from './routes/TeamRoutes.js';


const app = express();
// cors policy
app.use(cors());
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;


// JSON 
app.use(express.json());//sort data into json format

// Connect Database
connectDB(DATABASE_URL);


// Routes
app.use("/api/dashboard",router)//for security purposes change the path to /api/users
app.use("/api/team",teamrouter)//for security purposes change the path to /api/users

app.get("/",async (req,res)=>{
    
//     const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
//     // console.log();
//     for (let i = 0; i < 1000; i++) {
        // const newData = new DataModel({
        //     id:jsonData[i].id,
        //     first_name:jsonData[i].first_name,
        //     last_name:jsonData[i].last_name,
        //     email:jsonData[i].email,
        //     gender:jsonData[i].gender,
        //     avatar:jsonData[i].avatar,
        //     domain: jsonData[i].domain,
        //     available:jsonData[i].available,
        // });
        // await newData.save();
//     }
//     // const result= await DataModel.insertMany(jsonData);
//     // console.log(result);
    res.send("Running");
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});