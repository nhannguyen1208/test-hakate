const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
const homeRoutes = require("./routes/homeRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/password", forgotPasswordRoutes);
app.use("/api/home", homeRoutes); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
