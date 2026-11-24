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