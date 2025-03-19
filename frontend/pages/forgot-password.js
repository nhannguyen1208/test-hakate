import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/Login.module.css";
import Toast from "../components/Toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/password/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Kiểm tra email để đặt lại mật khẩu!");
      } else {
        toast.error(data.message || "Email không tồn tại!");
      }
    } catch (error) {
      toast.error("Lỗi kết nối!");
    }
  };

  return (
    <div className={styles.container}>
      <Toast />
      <div className={styles.leftSection}>
        <div className={styles.formContainer}>
          <h1 className={styles.helloContainer}>
            <span className={styles.helloText}>Forgot Password</span>
          </h1>
          <form onSubmit={handleForgotPassword}>
            <input
              type="email"
              placeholder="Enter email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.loginBtn}>Sent Reset Email </button>
          </form>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.infoBox}></div>
        <img src="/robot.png" alt="AI Robot" className={styles.robotImage} />
      </div>
    </div>
  );
}