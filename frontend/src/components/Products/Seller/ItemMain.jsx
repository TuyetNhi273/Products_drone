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
    <div className="items-display">
      <div className="items-list">
        {items && items.length > 0 ? (
          items.map((item) => (
            <div
              className="items-card"
              key={item.id}
              onClick={() => handleItemClick(item.id)} // Gọi handleItemClick khi click vào món hàng
            >
              <img className="items-image" src={item.images[0]} alt={item.itemName} />
              <div className="items-details">
                <h3 className="items-name">{item.itemName}</h3>
                <p className="items-price">{item.price} VND</p>
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
