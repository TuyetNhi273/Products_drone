import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    fetch("http://localhost:3080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "success") {
          // Save user data in localStorage
          const userData = { name, email, phone, password };
          localStorage.setItem("user", JSON.stringify(userData));

          alert("Đăng ký thành công!");
          navigate("/login"); // Điều hướng về trang đăng nhập
        } else {
          alert("Đăng ký thất bại. Vui lòng thử lại.");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi đăng ký:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      });
  };

  return (
    <div
      className="mainContainer"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          width: "500px",
          padding: "20px",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Đăng ký</h2>
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "15px" }}>
            <label>Tên tài khoản</label>
            <input
              className="register-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Địa chỉ email</label>
            <input
              className="register-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Mật khẩu</label>
            <input
              className="register-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Số điện thoại</label>
            <input
              className="register-input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                width: "100px",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
