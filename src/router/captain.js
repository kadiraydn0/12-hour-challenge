import { Router } from "express";
import { createCaptainHandler, signInHandler } from "../controller/user.controller.js"; 

const captain = Router();

captain.post("/signup", createCaptainHandler)
captain.post("/signin", signInHandler)

export default captain;