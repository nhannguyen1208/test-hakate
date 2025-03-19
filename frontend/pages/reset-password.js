import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import styles from "../styles/Login.module.css";
import Toast from "../components/Toast";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (!token) toast.error("Token không hợp lệ!");
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/password/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Mật khẩu đã được đặt lại!");
        router.push("/login");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Lỗi kết nối");
    }
  };

  return (
    <div className={styles.container}>
      <Toast />
      <div className={styles.leftSection}>
        <div className={styles.formContainer}>
          <h1 className={styles.helloContainer}>
            <span className={styles.helloText}>Reset Password</span>
          </h1>
          <form onSubmit={handleResetPassword}>
            <input
              type="password"
              placeholder="Enter new password"
              className={styles.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" className={styles.loginBtn}>
              Reset Password
            </button>
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