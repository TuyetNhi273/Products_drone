import React, { useState, useEffect } from "react";
import "./MyAccount.css";
import avt from "../../assets/image/avt.png"; // Import default avatar
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import axiosInstance from "../../services/Axios";
import { cloneDeep } from "lodash";

function MyAccount() {
  const user = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
    if (user && user.payload) {
      console.log(user["payload"]);
      setEmail(user["payload"]["email"]);
      setName(user["payload"]["name"]);
      setPhone(user["payload"]["phone"]);
      setGender(user["payload"]["gender"]);
      setAvatar(user["payload"]["avatar"]);
      setDay(user["payload"]["dob"]["day"]);
      setMonth(user["payload"]["dob"]["month"]);
      setYear(user["payload"]["dob"]["year"]);
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = () => {
    const updatedUserData = {
      name,
      email,
      phone,
      gender,
      avatar,
      dob: { day, month, year },
    };
    axiosInstance
      .post("/update-account", updatedUserData)
      .then((response) => {
        if (response.data.message !== "success") {
          alert("Lỗi kết nối với server!");
          return;
        }
        if (response.data.message === "success") {
          var updatedUserData = cloneDeep(user);
          updatedUserData["payload"]["name"] = name;
          updatedUserData["payload"]["email"] = email;
          updatedUserData["payload"]["phone"] = phone;
          updatedUserData["payload"]["gender"] = gender;
          updatedUserData["payload"]["avatar"] = avatar;
          updatedUserData["payload"]["dob"] = { day, month, year };
          dispatch(loginSuccess(updatedUserData));
        }
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
                checked={
                  gender === "male" ||
                  (user.payload && user.payload.gender === "male")
                }
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={
                  gender === "female" ||
                  (user.payload && user.payload.gender === "female")
                }
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={
                  gender === "other" ||
                  (user.payload && user.payload.gender === "other")
                }
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
