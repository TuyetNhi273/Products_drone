import React, { useState } from "react";  
import "./AddItem.css";
import axiosInstance from "../../../services/Axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AddItem = () => {
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemName, setItemName] = useState("");  
  const [price, setPrice] = useState("");         
  const [description, setDescription] = useState(""); 
  const [toppings, setToppings] = useState([]); 

  const email = useSelector((state) => state.auth.login.currentUser.payload.email);
  const avt = useSelector((state) => state.auth.login.currentUser.payload.avatar);

  const navigate = useNavigate();
  // Hàm tạo ID ngẫu nhiên
  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15); 
  };

  // Xử lý việc tải ảnh lên
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prevImages) => [...prevImages, reader.result]);
      if (images.length === 0) {
        setMainImage(reader.result); 
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Xử lý sự kiện khi người dùng nhấp vào ảnh trong slider
  const handleImageClick = (image, index) => {
    setMainImage(image); 
    setCurrentIndex(index);
  };

  // Chuyển sang ảnh tiếp theo
  const handleNextImage = () => {
    if (currentIndex < images.length - 3) {
      setCurrentIndex(currentIndex + 1); // Di chuyển 1 ảnh sang bên phải
    }
  };

  // Quay lại ảnh trước đó
  const handlePrevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Di chuyển 1 ảnh sang bên trái
    }
  };

  // Hiển thị 3 ảnh trong slider, nếu không đủ 3 ảnh thì hiển thị tất cả ảnh còn lại
  const getVisibleImages = () => {
    const totalImages = images.length;
    const visibleCount = Math.min(3, totalImages - currentIndex); 
    return images.slice(currentIndex, currentIndex + visibleCount); 
  };

  // Thêm một topping mới
  const addTopping = () => {
    setToppings([...toppings, { name: "", price: 0 }]);
  };

  // Cập nhật topping tại một chỉ số cụ thể
  const handleToppingChange = (index, field, value) => {
    const updatedToppings = [...toppings];
    updatedToppings[index][field] = value;
    setToppings(updatedToppings);
  };

  
  const saveItem = async () => {
    const randomId = generateRandomId(); 
    const itemData = {
      avatar:avt,
      email:email,
      id: randomId,
      images,        
      itemName,      
      price,        
      description,   
      toppings       
    };
    console.log(itemData);

    axiosInstance
    .post("/save-item", itemData)
    .then((response) => {
      if (response.status === 200) {
        alert("Item saved successfully!");
        navigate(`/products/purchase-order/seller/seller`);
        // Reset form nếu cần
        setItemName("");
        setPrice(0);
        setDescription("");
        setToppings([]);
        setImages([]);
        setMainImage(null);
      }
    })
    .catch((error) => {
      console.error("Error saving item:", error);
      alert("Failed to save item.");
    })
  };
  return (
    <div className="add-item-page">
      <div className="add-item-container">
        <div className="main-image-container">
          <img
            src={mainImage || "https://via.placeholder.com/400x300.png?text=No+Image"}
            alt="Main"
            className="main-image"
          />
        </div>
  
        <div className="upload-btn-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="upload-btn"
          />
        </div>
  
        <div className="image-sliders">
          <button className="slider-arrow left" onClick={handlePrevImage}>{"<"}</button>
  
          <div className="image-thumbnails">
            {getVisibleImages().map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className="image-thumbnail"
                onClick={() => handleImageClick(image, currentIndex + index)}
              />
            ))}
          </div>
  
          <button className="slider-arrow right" onClick={handleNextImage}>{">"}</button>
        </div>
      </div>
      
      <div className="items-info">
        <div className="items-name">
          <label>Item's name: </label>
          <input 
            type="text" 
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
            placeholder="Enter item's name" 
          />
        </div>

        <div className="items-price">
          <label>Price: </label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="Enter item's price" 
          />
        </div>

        <div className="items-topping">
          <label>Topping: </label>
          <span 
            className="adds-topping" 
            onClick={addTopping}
            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
          >
            Add
          </span>
        </div>

        <div className="items-topping-input-container">
          {toppings.map((topping, index) => (
            <div key={index} className="items-topping-input">
              <div className="items-topping-name">
                <label>Topping {index + 1}: </label>
                <input
                  type="text"
                  value={topping.name}
                  onChange={(e) => handleToppingChange(index, "name", e.target.value)}
                  placeholder="Enter topping's name"
                />
              </div>

              <div className="items-topping-price">
                <label>Price {index + 1}: </label>
                <input
                  type="number"
                  value={topping.price}
                  onChange={(e) => handleToppingChange(index, "price", e.target.value)}
                  placeholder="Enter topping's price"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="items-description">
          <label>Product Description: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Product Description"
          />
        </div>
        <div className="save"> 
          <div className="save-btn" onClick={saveItem}>Save</div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;

