import React, { useState } from "react";
import "./Tracking.css"; // CSS cho giao diện

function Tracking() {
  const [activeTab, setActiveTab] = useState("all");

  // Danh sách tab
  const tabs = [
    { id: "all", label: "All" },
    { id: "confirmed", label: "Confirmed" },
    { id: "pickup", label: "Picked up" },
    { id: "delivered", label: "Wait for delivery", count: 2 },
    { id: "completed", label: "Completed" },
    { id: "canceled", label: "Canceled" },
    { id: "refund", label: "Return/Refund" },
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
          placeholder="You can search by shop's name, order ID, or product's name"
        />
      </div>

      {/* Nội dung bên dưới */}
      <div className="content1">
        <h3>{tabs.find((tab) => tab.id === activeTab)?.label}</h3>
        <p style={{ position: "relative", top: "-320px" }}>
        Show content{" "}
        </p>
      </div>
    </div>
  );
}

export default Tracking;
