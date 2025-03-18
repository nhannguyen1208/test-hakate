const mongoose = require("mongoose");
const xlsx = require("xlsx");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const AiNews = require("./models/AiNews");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedNews() {
  try {
    const workbook = xlsx.readFile("AI_news_articles (1).xlsx"); 
    const sheetName = workbook.SheetNames[0]; 
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); 

    const newsData = data.map((row) => {
      return {
        id: uuidv4(), 
        title: row.title || "Không có tiêu đề",
        date: row.date || new Date().toISOString().split("T")[0], 
        content: row.content || "Không có nội dung",
        description: row.description || "Không có mô tả",
        image_url: row.image_url || "https://via.placeholder.com/150",
        link: row.link || "#",
      };
    });

    await AiNews.insertMany(newsData);
    console.log("Đã nhập dữ liệu tin tức thành công!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Lỗi khi nhập dữ liệu:", error);
  }
}

seedNews();