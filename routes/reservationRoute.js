import express from "express";
import { sendReservation } from "../controller/reservation.js";
//yha router ka instance create kr diya
const router=express.Router();

router.post("/send",sendReservation);

export default router;