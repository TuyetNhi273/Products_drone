import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import axiosInstance from "../../../services/Axios";
import "./Items.css";
import { useSelector } from "react-redux";
function ItemsMain() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // Khởi tạo hook navigate
  const email = useSelector((state) => state.auth.login.currentUser.payload.email);
  
  useEffect(() => {
    axiosInstance
      .get(`/get-items`)
      .then((d) => {
        if (d.status === 200) {
          setItems(d.data.items);
        } else {
          console.error("error");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [email]);

  const handleItemClick = (id) => {
    // Điều hướng tới trang chi tiết của món hàng khi click vào
    navigate(`/products/purchase-order/seller/item/${id}`);
  };

  return (
    <div className="itemss-display">
      <div className="itemss-list">
        {items && items.length > 0 ? (
          items.map((item) => (
            <div
              className="itemss-card"
              key={item.id}
              onClick={() => handleItemClick(item.id)} // Gọi handleItemClick khi click vào món hàng
            >
              <img className="itemss-image" src={item.images[0]} alt={item.itemName} />
              <div className="itemss-details">
                <h3 className="itemss-name">{item.itemName}</h3>
                <p className="itemss-price">{item.price} VND</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
}

export default ItemsMain;
