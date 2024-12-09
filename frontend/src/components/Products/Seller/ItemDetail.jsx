import React, { useEffect, useState } from "react";   
import { useParams } from "react-router-dom"; 
import axiosInstance from "../../../services/Axios";
import "./ItemDetail.css"; 
import SliderImg from "../SliderImg/SliderImg";
import { useSelector } from "react-redux";
import avt from "../../../assets/image/avt.png";
import AddToCart from "../Seller/AddToCart";
import BuyNow from "../Seller/BuyNow";

function ItemDetail() {
  const { id } = useParams(); // Lấy id từ URL
  const [item, setItem] = useState(null);
  const [listImg, setListImg] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [mainImage, setMainImage] = useState(""); // State cho ảnh chính
  const [payload, setPayload] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const tts_user = useSelector((state) => state.auth.login.currentUser);
  const tts_seller = useSelector((state) => state.auth.RFseller.success);
  
  const [user, setUser] = useState({
    shopName: tts_seller?.payload?.shopName || "Ẩn Danh",
    avatar: tts_user?.payload?.avatar || avt,
  });

  useEffect(() => {
    axiosInstance
      .get(`/get-item/${id}`) 
      .then((d) => {
        if (d.status === 200) {
          // console.log(d.data.item);
          setUser({
            shopName: d.data.item.shopName || "Ẩn Danh",
            avatar: d.data.item.avatar || avt,
          });
          setItem(d.data.item);
          const dd = d.data.item.images.map((img, index) => ({
            src: img,
            caption: String(id + index),
          }));
          setListImg(dd);
          setMainImage(d.data.item.images[0]); // Set ảnh chính ban đầu
        } else {
          console.error("Error fetching item details");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [id]);

  useEffect(() => {
    if (!item) return;
    setPayload({
      ...item,
      quantity,
      toppings: selectedToppings,
      totalPrice: totalPrice,
    });
  }, [item, quantity, selectedToppings, totalPrice]);

  // Tính tổng giá trị của topping đã chọn
  const selectedToppingPrice = Math.floor(
    selectedToppings.reduce((total, toppingName) => {
      const topping = item?.toppings?.find((t) => t.name === toppingName);
      return total + (topping ? parseInt(topping.price) : 0);
    }, 0)
  );

   // Tính tổng giá trị của món hàng cộng với topping
   useEffect(() => {
    if (!item) return;
    const calculatedTotalPrice = (item.price * quantity) + selectedToppingPrice;
    setTotalPrice(calculatedTotalPrice);
  }, [item?.price, quantity, selectedToppingPrice, item]);


  if (!item) {
    return <p>Loading...</p>;
  }

  
  // Xử lý sự kiện tăng/giảm số lượng
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(Math.max(1, quantity - 1));

  const handleSelectTopping = (topping) => {
    setSelectedToppings((prev) => {
      if (prev.includes(topping)) {
        return prev.filter((item) => item !== topping);
      } else {
        return [...prev, topping];
      }
    });
  };


 
  // Hàm xử lý khi click vào ảnh trong slider
  const handleImageClick = (image) => {
    setMainImage(image); // Cập nhật ảnh chính khi click vào ảnh trong slider
  };

  return (
    <div className="item-detail-container">
      <div className="item-detail-content">
        <div className="item-image">
          <img
            src={mainImage} // Hiển thị ảnh chính
            alt={item.itemName}
            className="item-image-main"
          />
          <div className="slider-items">
            <SliderImg 
              src={listImg} 
              onImageClick={handleImageClick} // Truyền hàm xử lý click ảnh vào SliderImg
            />
          </div>
        </div>
        <div className="item-info">
          <h2 >{item.itemName}</h2>
          <p className="item-price">{item.price} VND</p>
          {item.toppings && item.toppings.length > 0 && (
            <div className="item-toppings">
              <h4>Toppings:</h4>
              <div className="topping-buttons">
                {item.toppings.map((topping, index) => (
                  <button
                    key={index}
                    className={`topping-btn ${
                      selectedToppings.includes(topping.name) ? "selected" : ""
                    }`}
                    onClick={() => handleSelectTopping(topping.name)}
                  >
                    {topping.name} - {topping.price} VND
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="item-quantity">
            <label>Số lượng: </label>
            <button className="quantity-btn" onClick={decreaseQuantity}>
              -
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="quantity-input"
            />
            <button className="quantity-btn" onClick={increaseQuantity}>
              +
            </button>
          </div>
          <div className="item-actions">
            <BuyNow />
            <AddToCart payload={payload} />
          </div>
          <div className="total-price">
            Tổng giá trị: {totalPrice} VND
          </div>
        </div>
      </div>
      <div className="seller-infos">
        <div className="image-containers">
          <img 
            src={user.avatar} 
            alt="Seller" 
            className="seller-images" />
        </div>
        <p className="seller-names">{user.shopName}</p>
      </div>
      <div className="item-description">
        <div>Mô tả sản phẩm:</div>
        <p className="description">{item.description}</p>
      </div>
    </div>
  );
}

export default ItemDetail;

