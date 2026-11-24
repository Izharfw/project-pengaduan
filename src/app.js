import express from "express";

const app = express();

// Middleware: membaca body JSON yang dikirim dari Postman
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Pengaduan Mahasiswa berjalan",
  });
});

export default app;