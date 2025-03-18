const express = require("express");
const router = express.Router();
const AiNews = require("../models/AiNews");

router.get("/", async (req, res) => {
  try {
    const news = await AiNews.find();
    res.json(news);
  } catch (error) {
    console.error("Lỗi server:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
});

module.exports = router;
