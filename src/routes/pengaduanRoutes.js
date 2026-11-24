import { Router } from "express";
import { tambahPengaduan, lihatSemuaPengaduan } from "../controllers/pengaduanController.js";

const router = Router();
// Rute untuk menambah pengaduan (POST)
router.post("/", tambahPengaduan);

// Rute untuk melihat semua pengaduan (GET)
router.get("/", lihatSemuaPengaduan);

export default router;