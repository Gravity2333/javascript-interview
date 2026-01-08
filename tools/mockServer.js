const express = require("express");

const app = express();
const PORT = 3000;

// ===== 中间件 =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 简单日志
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ===== 路由 =====
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: Date.now(),
  });
});

app.post("/echo", (req, res) => {
  res.json({
    body: req.body,
  });
});

// ===== 404 =====
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// ===== 启动 =====
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
