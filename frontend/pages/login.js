import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from "../styles/Login.module.css";
import Toast from "../components/Toast"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      if (res.ok) {
        toast.success("Đăng nhập thành công");
  
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ email: data.email }));
        window.location.href = "/";
      } else {
        toast.error(data.message || "Sai email hoặc mật khẩu");
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
            <span className={styles.helloText}>Hello!</span>
          </h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={styles.options}>
              <a href="/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </a>
            </div>
            <button type="submit" className={styles.loginBtn}>
              Log in
            </button>
          </form>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.infoBox}>
        </div>
        <img src="/robot.png" alt="AI Robot" className={styles.robotImage} />
      </div>
    </div>
  );
}