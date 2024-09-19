import express from "express";
import verifyJwt from "../middlewares/verifyjwt.js";
import { getusers } from "../controllers/user.controller.js";

const router=express.Router();

router.get("/",verifyJwt,getusers);
export default router;