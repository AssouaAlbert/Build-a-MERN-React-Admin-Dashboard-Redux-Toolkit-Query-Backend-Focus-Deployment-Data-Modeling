import express from "express";
import getUser from "../controllers/general.js";
import getDashboard from "../controllers/dashboard.js";

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/dashboard", getDashboard);

export default router;