//data bhej rhe hai backend se

// import { json } from "express";
import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation=async (req,res,next)=>{

  if (!req.body) {
    return next(new ErrorHandler("Please fill full reservation form!", 400));
}


    const {firstName,lastName,email,phone,date,time}=req.body;

    if(!firstName||!lastName||!email||!phone||!date||!time){
        return next(new ErrorHandler("Please fill full reservation form!",400));

    }
    //tb code aage nhi jyega jb tk execute nhi hota
    try{
      await Reservation.create({firstName,lastName,email,phone,date,time});
      res.status(200).json({
        success:true,
        message:"Reservation Sent Successfully!",
      });

    }
    catch(error){
       if(error.name==="ValidationError"){
        const ValidationError=Object.values(error.errors).map(
            (err)=>err.message
        );
        return next(new ErrorHandler(ValidationError.join(" , "),400));
       }
    }
};