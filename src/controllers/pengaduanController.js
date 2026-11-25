import mongoose from "mongoose";
import Pengaduan from "../models/Pengaduan.js";

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
    const data = await Pengaduan.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: data.length, data });
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