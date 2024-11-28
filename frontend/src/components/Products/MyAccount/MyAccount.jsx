import React, { useState, useEffect } from "react";

import "./MyAccount.css";

import avt from "../../../assets/image/avt.png"
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/authSlice";
import { useSelector } from "react-redux";
import axiosInstance from "../../../services/Axios";
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
  const [isUploading, setIsUploading] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  useEffect(() => {
    if (user && user.payload) {
      console.log(user["payload"]);
      setEmail(user["payload"]?.email ?? "");
      setName(user["payload"]?.name ?? "");
      setPhone(user["payload"]?.phone ?? "");
      setGender(user["payload"]?.gender ?? "");
      setAvatar(user["payload"]?.avatar ?? null);
      setDay(user["payload"]?.dob?.day ?? "");
      setMonth(user["payload"]?.dob?.month ?? "");
      setYear(user["payload"]?.dob?.year ?? "");
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (avatar && avatar.startsWith("blob:")) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);
  

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true); // Đánh dấu bắt đầu tải
    // Hiển thị tạm thời blob URL
    const tempBlobUrl = URL.createObjectURL(file);
    setAvatar(tempBlobUrl);

    // Tạo FormData để gửi file đến server
    const formData = new FormData();
    formData.append("avatar", file);

    try {
        // Gửi request đến server để upload file
        const response = await axiosInstance.post("/upload-avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        // Nhận URL từ server và cập nhật vào state
        if (response.data?.avatarUrl) {
            setAvatar(response.data.avatarUrl);
        } else {
          throw new Error("Did not receive a URL from the server.");
        }
    } catch (error) {
        console.error("Error uploading the image:", error);
        alert("Unable to upload the image, please try again.");
        setAvatar(avt);
    } finally {
      // Chỉ giải phóng blob URL nếu tempBlobUrl còn tồn tại
      if (tempBlobUrl.startsWith("blob:")) {
        URL.revokeObjectURL(tempBlobUrl);
      }
      setIsUploading(false);
    }
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
          alert("Connection error with the server!");
          return;
        }
        if (response.data.message === "success") {
          const updatedUserDataClone = cloneDeep(user);
          updatedUserDataClone.payload = { ...updatedUserDataClone.payload, ...updatedUserData };
          dispatch(loginSuccess(updatedUserDataClone));
      }
      })
      .catch((error) => {
        console.error("Error updating information:", error);
        alert("Connection error with the server!");
      });
  };

  return (
    <div className="my-account-container">
      <h2 style={{fontSize: "1.5rem", fontWeight: "bold"}}>My Account</h2>
      <p className="text1"
      >
        Managing profile information to secure the account
      </p>
      <div className="form-container">
        <div className="form-section">
          <label className="text2">UserName:</label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <div style={{ display: "flex", marginBottom: "-0.5rem"}}>
          <label className="text2">Email:</label>
          <p>
            {email || "Addison"}
          </p>
          </div>
          <br />
          <label className="text2">Phone:</label>
          <input
            className="form-control"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label>
            Gender:
          </label>
          <div>
            <label>
              <input
              className="text3"
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
                className="text3"
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
                className="text3"
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
            Save
          </button>
        </div>

        <div className="avatar-section">
        {isUploading && <p style={{ color: "blue" }}>Loading...</p>} {/* Hiển thị thông báo */}
          <img 
            src={avatar || avt} 
            alt="Avatar" 
            className="avatar"
            onError={(e) => {
              console.error("Invalid Avatar URL:", avatar);
              e.target.src = avt; 
            }} 
          />
          <label className="upload-button">
            Choose an image
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
