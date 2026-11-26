# REST API Pengaduan Mahasiswa

Final Project **Study Club Backend Basic** – KSM Veterantech UPNVJ 2026

| | |
|---|---|
| **Nama** | Izhar Fakhriy Widigdo |
| **NIM** | 2610501056 |
| **Judul Project** | REST API Pengaduan Mahasiswa |
| **Repository** | https://github.com/Izharfw/project-pengaduan |

## Deskripsi

REST API sederhana untuk mengelola laporan pengaduan mahasiswa kepada kampus
(fasilitas, akademik, keuangan, dan lainnya). Setiap pengaduan punya status yang
bisa dilacak: **Menunggu**, **Diproses**, dan **Selesai**.

API dibangun dengan **ExpressJS** dan **MongoDB** (lewat Mongoose) dengan arsitektur
modular: Model, Controller, dan Routes. Data disimpan di MongoDB, bukan di array dalam kode.

## Teknologi

- Node.js (ES Modules)
- ExpressJS
- MongoDB (lokal) + Mongoose
- dotenv
- Git dan GitHub
- Postman (pengujian)

## Struktur Folder

```
project-pengaduan/
├── src/
│   ├── config/
│   │   └── db.js                        # koneksi ke MongoDB
│   ├── controllers/
│   │   └── pengaduanController.js       # logika CRUD, filter, dan statistik
│   ├── middlewares/
│   │   └── errorHandler.js              # penanganan 404 dan error terpusat
│   ├── models/
│   │   └── Pengaduan.js                 # skema dan validasi data
│   ├── routes/
│   │   └── pengaduanRoutes.js           # daftar endpoint
│   └── app.js                           # konfigurasi Express
├── server.js                            # titik masuk aplikasi
├── postman_collection.json              # collection untuk pengujian
├── .env.example                         # contoh environment variable
├── .gitignore
└── package.json
```

## Prasyarat

- [Node.js](https://nodejs.org) (disarankan versi LTS terbaru)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) yang sudah berjalan di komputer lokal
- (Opsional) MongoDB Compass untuk melihat isi database
- Postman untuk menguji endpoint

## Cara Instalasi

```bash
# 1. Clone repository
git clone https://github.com/Izharfw/project-pengaduan.git
cd project-pengaduan

# 2. Pasang semua package
npm install

# 3. Buat file environment dari contoh
cp .env.example .env          # Windows (CMD): copy .env.example .env
```

## Environment Variable

Isi file `.env` (contohnya ada di `.env.example`):

| Variable | Contoh nilai | Keterangan |
|---|---|---|
| `PORT` | `3000` | Port tempat server berjalan |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/pengaduan_mahasiswa` | Alamat MongoDB lokal dan nama database |

File `.env` tidak ikut di-commit (sudah masuk `.gitignore`).

## Menjalankan Server

Pastikan MongoDB lokal sudah berjalan, lalu:

```bash
npm run dev      # mode development (restart otomatis saat file berubah)
npm start        # mode biasa
```

Kalau berhasil, terminal menampilkan:

```
Terhubung ke MongoDB: pengaduan_mahasiswa
Server berjalan di http://localhost:3000
```

## Format Data

| Field | Tipe | Keterangan |
|---|---|---|
| `_id` | ObjectId | ID unik, dibuat otomatis oleh MongoDB |
| `nama` | String | Nama mahasiswa pelapor (wajib) |
| `kategori` | String | `Fasilitas`, `Akademik`, `Keuangan`, atau `Lainnya` (wajib) |
| `isi` | String | Isi pengaduan, minimal 5 karakter (wajib) |
| `status` | String | `Menunggu` (bawaan), `Diproses`, atau `Selesai` |
| `createdAt`, `updatedAt` | Date | Dibuat otomatis |

## Daftar Endpoint

Base URL: `http://localhost:3000/api/pengaduan`

| Method | Endpoint | Fungsi | Status sukses |
|---|---|---|---|
| POST | `/api/pengaduan` | Tambah pengaduan baru | 201 |
| GET | `/api/pengaduan` | Tampilkan semua pengaduan (mendukung filter dan pencarian) | 200 |
| GET | `/api/pengaduan/:id` | Tampilkan satu pengaduan berdasarkan ID | 200 |
| GET | `/api/pengaduan/statistik` | Jumlah pengaduan per status dan per kategori | 200 |
| PUT | `/api/pengaduan/:id` | Ubah nama, kategori, dan isi pengaduan (semua wajib diisi) | 200 |
| PATCH | `/api/pengaduan/:id/status` | Ubah status pengaduan | 200 |
| DELETE | `/api/pengaduan/:id` | Hapus pengaduan | 200 |

### Query Parameter (GET `/api/pengaduan`)

| Parameter | Contoh | Keterangan |
|---|---|---|
| `kategori` | `?kategori=Fasilitas` | Filter berdasarkan kategori (tidak peka huruf besar/kecil) |
| `status` | `?status=Menunggu` | Filter berdasarkan status (tidak peka huruf besar/kecil) |
| `search` | `?search=proyektor` | Cari kata pada `isi` atau `nama` |

Parameter bisa digabung, contoh: `/api/pengaduan?kategori=Fasilitas&status=Selesai&search=meja`

### Contoh Request dan Response

**POST** `/api/pengaduan`

```json
{
  "nama": "Budi Santoso",
  "kategori": "Fasilitas",
  "isi": "Proyektor di ruang B1.2 tidak menyala"
}
```

Response `201 Created`:

```json
{
  "success": true,
  "message": "Pengaduan berhasil ditambahkan",
  "data": {
    "_id": "665f1c2e8a1b2c3d4e5f6a7b",
    "nama": "Budi Santoso",
    "kategori": "Fasilitas",
    "isi": "Proyektor di ruang B1.2 tidak menyala",
    "status": "Menunggu",
    "createdAt": "2026-11-26T08:00:00.000Z",
    "updatedAt": "2026-11-26T08:00:00.000Z"
  }
}
```

**PATCH** `/api/pengaduan/:id/status`

```json
{ "status": "Diproses" }
```

**GET** `/api/pengaduan/statistik`

```json
{
  "success": true,
  "data": {
    "total": 3,
    "perStatus": { "Menunggu": 1, "Diproses": 1, "Selesai": 1 },
    "perKategori": { "Fasilitas": 1, "Akademik": 1, "Keuangan": 1, "Lainnya": 0 }
  }
}
```

### Kode Status dan Error

| Kode | Arti |
|---|---|
| 200 | Berhasil |
| 201 | Data berhasil dibuat |
| 400 | Permintaan tidak valid (validasi gagal, format ID salah, kategori/status tidak dikenal, JSON rusak) |
| 404 | Data atau endpoint tidak ditemukan |
| 500 | Kesalahan pada server |

Contoh response error:

```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": ["Kategori harus salah satu dari: Fasilitas, Akademik, Keuangan, Lainnya"]
}
```

## Pengujian dengan Postman

1. Buka Postman, klik **Import**, lalu pilih file `postman_collection.json`.
2. Pastikan variabel collection `baseUrl` bernilai `http://localhost:3000`.
3. Jalankan request secara berurutan, dimulai dari **Tambah Pengaduan (POST)**.
4. Pastikan server dan MongoDB sedang berjalan sebelum menguji.

## Presentasi

File presentasi (PDF) ada di repository ini: `Presentasi_Final_Project_Pengaduan.pdf`.
