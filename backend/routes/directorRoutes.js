import express from "express";
import { fetchAllDirectors } from "../controllers/directors.js";

const router = express.Router();

router.get("/directors/all", fetchAllDirectors);

export default router;
