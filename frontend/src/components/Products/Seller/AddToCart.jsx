import React, { useState,useEffect } from "react"; 
import "./AddToCart.css";
import {ItemCartStart, ItemCartSuccess } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function AddToCart( payload ) {
    // State để lưu số lượng sản phẩm trong giỏ hàng
    const [cartCount, setCartCount] = useState(0);
    const dispatch = useDispatch();
    const userItemCart = useSelector((state) => state.auth.ItemCart.success);

    useEffect(() => {
        if (userItemCart !== null) {
            setCartCount(userItemCart?.cartCount);
        }
        else{
            setCartCount(0);
        }
    }, [cartCount, payload, userItemCart]);

    // Hàm xử lý khi nhấn "Add to cart"
    const handleAddToCart = () => {
        dispatch(ItemCartStart());
        setCartCount(cartCount + 1);  // Tăng số lượng sản phẩm trong giỏ hàng

        dispatch(ItemCartSuccess({
            cartCount: cartCount + 1,
            cartItems: payload.payload
        }));
        alert("Thêm vào giỏ hàng!");
    };

    return (
        <div>
            <button onClick={handleAddToCart} className="add-to-cart-btn">
                Add to cart 
            </button>
        </div>
    );
}

export default AddToCart;
