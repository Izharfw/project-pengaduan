import { Router } from "express";
import { tambahPengaduan } from "../controllers/pengaduanController.js";

const router = Router();
router.post("/", tambahPengaduan);

export default router;