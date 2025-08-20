import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js"




const app=express();
dotenv.config({path:"./config/config.env"});

//yha origin mai  fronted ka path dena chte hai jha  backend ke sath connect krna chte hai
//METHOD mai hum aapna fronted or backend mai kon kon sa method use krna chte hai.
//yha post method likhe hai means data ko bhejenge yha se

//app .use likhe to ab cors ko backend middlewhere jaise use krega.

app.use(cors({
    // origin:[process.env.FRONTEND_URL],
    // origin: ["http://localhost:5174", "http://localhost:5188"], 
    // origin: "http://localhost:5198",
    origin: true,

      // methods:["POST"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials:true,
}));

//ak hum string denge jo json fromat mai hogi;
//or ye json object mai convert krdega.
//mtlab string ko object mai convert krne ke liye express.json likhte hai.

app.use(express.json());
// app.options("*", cors());
//urlencoded ka use krte hai data kis type ka hone wla hai.
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/reservation",reservationRouter);

app.get("/",(req,res,next)=>{
  return res.status(200).json({
    success:true,
    message:"HELLO WORLD",
  });
});

dbConnection();
app.use(errorMiddleware);


export default app;