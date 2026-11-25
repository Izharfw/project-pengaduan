import { Router } from "express";
import { tambahPengaduan, lihatSemuaPengaduan, cariPengaduanById, ubahPengaduan } from "../controllers/pengaduanController.js";

const router = Router();
// Rute untuk menambah pengaduan (POST)
router.post("/", tambahPengaduan);

// Rute untuk melihat semua pengaduan (GET)
router.get("/", lihatSemuaPengaduan);

// Rute untuk mencari pengaduan berdasarkan ID (GET)
router.get("/:id", cariPengaduanById);

// Rute untuk mengubah pengaduan berdasarkan ID (PUT)
router.put("/:id", ubahPengaduan);

export default router;