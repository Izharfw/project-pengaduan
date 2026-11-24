import mongoose from "mongoose";

export const DAFTAR_KATEGORI = ["Fasilitas", "Akademik", "Keuangan", "Lainnya"];
export const DAFTAR_STATUS = ["Menunggu", "Diproses", "Selesai"];

const pengaduanSchema = new mongoose.Schema(
  {
    nama: { type: String, required: [true, "Nama wajib diisi"], trim: true },
    kategori: {
      type: String,
      required: [true, "Kategori wajib diisi"],
      enum: { values: DAFTAR_KATEGORI, message: `Kategori harus salah satu dari: ${DAFTAR_KATEGORI.join(", ")}` },
    },
    isi: { type: String, required: [true, "Isi pengaduan wajib diisi"], trim: true, minlength: [5, "Isi pengaduan minimal 5 karakter"] },
    status: {
      type: String,
      enum: { values: DAFTAR_STATUS, message: `Status harus salah satu dari: ${DAFTAR_STATUS.join(", ")}` },
      default: "Menunggu",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pengaduan", pengaduanSchema);