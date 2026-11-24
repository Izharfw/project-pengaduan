export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan` });
}

export function errorHandler(err, req, res, next) {
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: "Validasi gagal", errors });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ success: false, message: `Nilai tidak valid untuk field '${err.path}'` });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Format JSON pada body request tidak valid" });
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
}