import React from "react";
import "./HomePage.css";
import Slideshow from "../SliderImg/Slideshow";

import Merchandise from "../Merchandise/Merchandise";

import img1 from "../../../assets/image/img1.jpg";
import img2 from "../../../assets/image/img2.jpg";
import img3 from "../../../assets/image/img3.jpg";
import img4 from "../../../assets/image/img4.jpg";
import img5 from "../../../assets/image/img5.jpg";
import img6 from "../../../assets/image/img6.jpg";

import icon from "../../../assets/image/all.jpg";
import icon1 from "../../../assets/image/clothes.jpg";
import icon2 from "../../../assets/image/food.jpg";
import icon3 from "../../../assets/image/beverage.jpg";
import icon4 from "../../../assets/image/wh.jpg";

import delivery from "../../../assets/image/delivery.jpg";

const collection = [
  { src: img1, caption: "Caption one" },
  { src: img2, caption: "Caption two" },
  { src: img3, caption: "Caption three" },
  { src: img4, caption: "Caption four" },
  { src: img5, caption: "Caption five" },
  { src: img6, caption: "Caption six" },
];

const icons = [
  { icon: icon, text: "All" },
  { icon: icon1, text: "Clothes" },
  { icon: icon2, text: "Food" },
  { icon: icon3, text: "Beverage" },
  { icon: icon4, text: "Household Appliances" },
];

function HomePage() {
  return (
    <div className="HomePage">
      <div className="lead">
        <Slideshow input={collection} ratio={`5:2`} mode={`automatic`} />
        <img className="image" src={delivery} alt="delivery" />
      </div>
      <div className="icon-section">
        {icons.map((item, index) => (
          <div className="icon-container" key={index}>
            <div className="icon-circle">
              <img src={item.icon} alt={item.text} className="icon-image" />
            </div>
            <p className="icon-text">{item.text}</p>
          </div>
        ))}
      </div>
      <Merchandise />
    </div>
  );
}

export default HomePage;
