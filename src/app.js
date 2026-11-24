import express from "express";
import pengaduanRoutes from "./routes/pengaduanRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
const app = express();

// Middleware: membaca body JSON yang dikirim dari Postman
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Pengaduan Mahasiswa berjalan",
  });
});
app.use("/api/pengaduan", pengaduanRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;