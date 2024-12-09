import React from "react";
import "./BuyNow.css";
function BuyNow() {
    const handleBuyNow = () => {
        alert("Mua ngay!");
      };
    return <div>
        <button onClick={handleBuyNow} className="buy-now-btn">
            Buy Now
        </button></div>;
}

export default BuyNow;