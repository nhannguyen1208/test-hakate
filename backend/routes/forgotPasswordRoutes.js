const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    secure: false, 
    tls: {
        rejectUnauthorized: false,
    },
});

router.post("/forgot", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Email không tồn tại" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.tokenExpiry = Date.now() + 15 * 60 * 1000; 
        await user.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

        await transporter.sendMail({
            from: `"Hỗ trợ" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Yêu cầu đặt lại mật khẩu",
            html: `<p>Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào link sau để tiếp tục:</p>
                   <a href="${resetLink}">${resetLink}</a>
                   <p>Link sẽ hết hạn sau 15 phút.</p>`,
        });

        console.log(`Email reset password đã gửi tới: ${email}`);
        res.json({ message: "Email đặt lại mật khẩu đã được gửi" });
    } catch (err) {
        console.error("Lỗi gửi email", err);
        res.status(500).json({ error: "Lỗi server" });
    }
});

router.post("/reset", async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ error: "Mật khẩu mới phải có ít nhất 6 ký tự" });
        }

        const user = await User.findOne({ resetToken: token, tokenExpiry: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ error: "Token không hợp lệ hoặc đã hết hạn" });

        console.log(`Reset password cho user: ${user.email}`);

        user.password = newPassword;
        user.resetToken = undefined;
        user.tokenExpiry = undefined;
        await user.save();

        console.log("Mật khẩu đã được đặt lại thành công");
        res.json({ message: "Mật khẩu đã được đặt lại thành công" });
    } catch (err) {
        console.error("Lỗi đặt lại mật khẩu:", err);
        res.status(500).json({ error: "Lỗi server" });
    }
});

module.exports = router;
