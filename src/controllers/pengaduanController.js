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