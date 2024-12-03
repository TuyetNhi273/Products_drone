import React, { useState, useEffect } from "react";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#bebebe", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#bebebe", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
}

function SliderImg({ src, onImageClick }) {
  const [data, setData] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    rtl: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  useEffect(() => {
    setData(src);
  }, [src]);

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index} onClick={() => onImageClick(item.src)}>
            <img 
              src={item.src} 
              alt={item.caption} 
              style={{ width: "7.2rem", height: "5rem", objectFit: "center" }} 
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderImg;
