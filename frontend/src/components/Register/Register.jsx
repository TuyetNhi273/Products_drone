import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerStart, registerFalse, registerSuccess } from "../../redux/authSlice";

function Register() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Hàm xử lý đăng ký
  const handleRegister = (e) => {
    e.preventDefault();
    
    // Bắt đầu quá trình đăng ký
    dispatch(registerStart());

    // Gửi yêu cầu đến API đăng ký
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
          // Đăng ký thành công
          dispatch(registerSuccess());
          const userData = { name, email, phone, password };
          localStorage.setItem("user", JSON.stringify(userData));

          alert("Đăng ký thành công!");
          navigate("/login"); // Điều hướng đến trang đăng nhập
        } else {
          // Đăng ký thất bại
          dispatch(registerFalse());
          alert("Đăng ký thất bại. Vui lòng thử lại.");
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        dispatch(registerFalse());
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
          display: "block",
          width: "500px",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
        }}
      >
        <h2 className="margin" style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>Đăng ký</h2>
        <form onSubmit={handleRegister}>
          <div className="tk">
            <label>Tên tài khoản</label>
            <input
              className="register-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="tk">
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
          <div className="tk">
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
          <div className="tk">
            <label>Số điện thoại</label>
            <input
              className="register-input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="margin" style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                width: "100px",
                height: "2rem",
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "8px",
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
