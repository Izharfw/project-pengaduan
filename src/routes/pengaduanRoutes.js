import { Router } from "express";
import { tambahPengaduan, lihatSemuaPengaduan, cariPengaduanById, ubahPengaduan, ubahStatusPengaduan, hapusPengaduan, hitungStatistik } from "../controllers/pengaduanController.js";

const router = Router();
// Rute untuk menambah pengaduan (POST)
router.post("/", tambahPengaduan);

// Rute untuk melihat semua pengaduan (GET)
router.get("/", lihatSemuaPengaduan);

// Rute untuk menghitung statistik pengaduan (GET)
router.get("/statistik", hitungStatistik);

// Rute untuk mencari pengaduan berdasarkan ID (GET)
router.get("/:id", cariPengaduanById);

// Rute untuk mengubah pengaduan berdasarkan ID (PUT)
router.put("/:id", ubahPengaduan);

// Rute untuk mengubah status pengaduan berdasarkan ID (PATCH)
router.patch("/:id/status", ubahStatusPengaduan);

// Rute untuk menghapus pengaduan berdasarkan ID (DELETE)
router.delete("/:id", hapusPengaduan);

export default router;