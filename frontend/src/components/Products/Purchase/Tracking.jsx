import React, { useState } from "react";
import "./Tracking.css"; // CSS cho giao diện

function Tracking() {
  const [activeTab, setActiveTab] = useState("all");

  // Danh sách tab
  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "confirmed", label: "Xác nhận" },
    { id: "pickup", label: "Lấy hàng" },
    { id: "delivered", label: "Chờ giao hàng", count: 2 },
    { id: "completed", label: "Hoàn thành" },
    { id: "canceled", label: "Đã hủy" },
    { id: "refund", label: "Trả hàng/Hoàn tiền" },
  ];

  return (
    <div className="tracking-container">
      {/* Thanh điều hướng tab */}
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.count && <span className="tab-count">({tab.count})</span>}
          </div>
        ))}
      </div>

      {/* Khu vực tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
        />
      </div>

      {/* Nội dung bên dưới */}
      <div className="content">
        <h3>{tabs.find((tab) => tab.id === activeTab)?.label}</h3>
        <p style={{ position: "relative", top: "-320px" }}>
          Hiển thị nội dung{" "}
        </p>
      </div>
    </div>
  );
}

export default Tracking;
