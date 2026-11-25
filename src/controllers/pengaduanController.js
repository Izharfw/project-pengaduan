import mongoose from "mongoose";
import Pengaduan, { DAFTAR_KATEGORI, DAFTAR_STATUS } from "../models/Pengaduan.js";

// Cocokkan input dengan daftar resmi tanpa peduli huruf besar/kecil.
// "fasilitas" -> "Fasilitas". Kalau tidak ada yang cocok, hasilnya undefined.
function cocokkanPilihan(input, daftar) {
  return daftar.find((item) => item.toLowerCase() === String(input).toLowerCase());
}

// Netralkan karakter khusus regex supaya pencarian aman
function escapeRegex(teks) {
  return teks.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function tambahPengaduan(req, res, next) {
  try {
    const { nama, kategori, isi } = req.body;
    const dataBaru = await Pengaduan.create({ nama, kategori, isi });
    res.status(201).json({ success: true, message: "Pengaduan berhasil ditambahkan", data: dataBaru });
  } catch (error) {
    next(error);
  }
}
export async function lihatSemuaPengaduan(req, res, next) {
  try {
    const { kategori, status, search } = req.query;
    const filter = {};

    if (kategori) {
      const valid = cocokkanPilihan(kategori, DAFTAR_KATEGORI);
      if (!valid) {
        return res.status(400).json({
          success: false,
          message: `Kategori tidak valid. Pilihan: ${DAFTAR_KATEGORI.join(", ")}`,
        });
      }
      filter.kategori = valid;
    }
    if (status) {
      const valid = cocokkanPilihan(status, DAFTAR_STATUS);
      if (!valid) {
        return res.status(400).json({
          success: false,
          message: `Status tidak valid. Pilihan: ${DAFTAR_STATUS.join(", ")}`,
        });
      }
      filter.status = valid;
    }
    if (search) {
      const regex = new RegExp(escapeRegex(String(search)), "i");
      filter.$or = [{ isi: regex }, { nama: regex }];
    }
    const data = await Pengaduan.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
}
export async function hitungStatistik(req, res, next) {
  try {
    const hitung = await Promise.all(DAFTAR_STATUS.map((status) => Pengaduan.countDocuments({ status })));
    const data = {};
    DAFTAR_STATUS.forEach((status, i) => { data[status] = hitung[i]; });
    data.Total = hitung.reduce((a, b) => a + b, 0);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
export async function cariPengaduanById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Format ID tidak valid" });
    }
    const data = await Pengaduan.findById(id);
    if (!data) {
      return res.status(404).json({ success: false, message: `Pengaduan dengan ID ${id} tidak ditemukan` });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
export async function ubahPengaduan(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Format ID tidak valid" });
    }
    const data = await Pengaduan.findById(id);
    if (!data) {
      return res.status(404).json({ success: false, message: `Pengaduan dengan ID ${id} tidak ditemukan` });
    }
    const { nama, kategori, isi } = req.body;
    data.nama = nama;
    data.kategori = kategori;
    data.isi = isi;
    await data.save();
    res.status(200).json({ success: true, message: "Pengaduan berhasil diubah", data });
  } catch (error) {
    next(error);
  }
}
export async function ubahStatusPengaduan(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Format ID tidak valid" });
    }
    const data = await Pengaduan.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!data) {
      return res.status(404).json({ success: false, message: `Pengaduan dengan ID ${id} tidak ditemukan` });
    }
    res.status(200).json({ success: true, message: "Status pengaduan berhasil diubah", data });
  } catch (error) {
    next(error);
  }
}
export async function hapusPengaduan(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Format ID tidak valid" });
    }
    const data = await Pengaduan.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ success: false, message: `Pengaduan dengan ID ${id} tidak ditemukan` });
    }
    res.status(200).json({ success: true, message: "Pengaduan berhasil dihapus", data });
  } catch (error) {
    next(error);
  }
}