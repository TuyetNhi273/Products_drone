import React, { useCallback, useState, useEffect, useRef } from "react";
import "./Slideshow.css";

const Slideshow = ({ input, ratio, mode, timeout = 5000 }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const ratioWH = ratio ? ratio.split(":")[0] / ratio.split(":")[1] : 1;
 
  // Handlers for navigation
  const backward = () => setSlideIndex(getNewSlideIndex(-1));
  const forward = () => setSlideIndex(getNewSlideIndex(1));

  // Calculate new slide index
  const getNewSlideIndex = useCallback(
    (step) => {
      const numberSlide = input.length;
      let newSlideIndex = slideIndex + step;

      if (newSlideIndex >= numberSlide) newSlideIndex = 0;
      else if (newSlideIndex < 0) newSlideIndex = numberSlide - 1;

      return newSlideIndex;
    },
    [slideIndex, input.length]
  );

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.height = `${
        containerRef.current.offsetWidth / ratioWH
      }px`;
    }
  }, [ratioWH]);

  // Run automatic slideshow if in "automatic" mode
  const runAutomatic = useCallback(() => {
    setSlideIndex((prevIndex) => getNewSlideIndex(1));
  }, [getNewSlideIndex]);

  // Set up dimensions and automatic slideshow on mount
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    if (mode === "automatic") {
      intervalRef.current = setInterval(runAutomatic, timeout);
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [mode, timeout, updateDimensions, runAutomatic, getNewSlideIndex]);

  return (
    <div className="lp-slideshow">
      <div className="container" ref={containerRef}>
        {input.map((image, index) => (
          <div
            key={index}
            className={`slide ${slideIndex === index ? "active" : ""}`}
          >
            <div className="number-text">
              {`${index + 1} / ${input.length}`}
            </div>
            <img className="image" src={image.src} alt={image.caption} />
            <div className="caption-text">{image.caption}</div>
          </div>
        ))}

        <span className="prev" onClick={backward}>
          &#171;
        </span>
        <span className="next" onClick={forward}>
          &#187;
        </span>
      </div>

      <div className="dot-container">
        {input.map((_, index) => (
          <span
            key={index}
            className={`dot ${slideIndex === index ? "active" : ""}`}
            onClick={() => setSlideIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;


