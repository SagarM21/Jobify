import express from "express";
const router = express.Router();

import { register, login, updateUser } from "../controllers/authController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").patch(updateUser);

export default router