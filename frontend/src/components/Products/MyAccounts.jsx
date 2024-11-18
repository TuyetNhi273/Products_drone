import React, { useState, useEffect } from "react";
import "./MyAccount.css";
import avt from "../../assets/image/avt.png"; // Import default avatar
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

function MyAccount() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")).payload;
    if (userData) {
      setName(userData?.name || "");
      setEmail(userData?.email || "");
      setPassword(userData?.password || "");
      setPhone(userData?.phone || "");
      setGender(userData?.gender || "");
      setAvatar(userData?.avatar || null);
      setDay(userData?.dob?.day || "");
      setMonth(userData?.dob?.month || "");
      setYear(userData?.dob?.year || "");
    }
  }, []);

  const handleAvatarChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = () => {
    const updatedUserData = {
      name,
      email,
      password,
      phone,
      gender,
      avatar,
      dob: { day, month, year },
    };

    fetch("http://localhost:3080/update-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi cập nhật thông tin");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message || "Thông tin đã được cập nhật!");
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        dispatch(loginSuccess(JSON.stringify(updatedUserData)));
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin:", error);
        alert("Lỗi kết nối với server!");
      });
  };

  return (
    <div className="my-account-container">
      <h2>Hồ Sơ Của Tôi</h2>
      <p
        style={{
          borderBottom: "1px solid #ccc",
          marginBottom: "20px",
          marginTop: "-10px",
          paddingBottom: "20px",
        }}
      >
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </p>
      {/* /-strong/-heart:>:o:-((:-h{" "} */}
      <div className="form-container">
        <div className="form-section">
          <label style={{ marginRight: "10px" }}>UserName:</label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label style={{ marginRight: "10px" }}>Email:</label>
          <p style={{ display: "inline-block", marginBottom: "4px" }}>
            {email || "Addison"}
          </p>
          <br />
          <label style={{ marginRight: "10px" }}>Password:</label>
          <p style={{ display: "inline-block" }}>{password || "Addison"}</p>
          <br />
          <label style={{ marginRight: "10px" }}>Phone:</label>
          <input
            className="form-control"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label
            style={{
              display: "inline-block",
              marginRight: "10px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Gender:
          </label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={gender === "other"}
                onChange={(e) => setGender(e.target.value)}
              />
              Other
            </label>
          </div>
          <label
            style={{
              display: "inline-block",
              marginRight: "10px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Birthdate:
          </label>
          <div className="birthdate-select">
            <select value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="">Day</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">Month</option>
              {months.map((m, index) => (
                <option key={index} value={index + 1}>
                  {m}
                </option>
              ))}
            </select>
            {/* /-strong/-heart:>:o:-((:-h{" "} */}
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <br />
          <button onClick={handleSave} className="save-button">
            Lưu
          </button>
        </div>

        <div className="avatar-section">
          <img src={avatar || avt} alt="Avatar" className="avatar" />
          <label className="upload-button">
            Chọn Ảnh
            <input
              type="file"
              onChange={handleAvatarChange}
              accept=".jpg,.png"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
