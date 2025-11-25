import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Banner1 from "@images/banner1.png";
import Banner3 from "@images/banner3.png";
import Banner4 from "@images/banner4.jpg";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

const Carousel = ({ interval = 8000 }) => {
  const imagesBanner = [Banner1, Banner3, Banner4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imagesBanner.length);
    }, interval);

    return () => clearInterval(timer);
  }, [imagesBanner.length, interval]);

  const prevSlide = () => {
    setCurrentIndex(
      (currentIndex - 1 + imagesBanner.length) % imagesBanner.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % imagesBanner.length);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel__slides}>
        {imagesBanner.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`${styles.carousel__image} ${
              index === currentIndex ? styles.active : ""
            }`}
          />
        ))}
      </div>

      <span className={styles.carousel__prev} onClick={prevSlide}>
        <GrPrevious />
      </span>
      <span className={styles.carousel__next} onClick={nextSlide}>
        <GrNext />
      </span>

      <div className={styles.carousel__dots}>
        {imagesBanner.map((_, index) => (
          <span
            key={index}
            className={`${styles.carousel__dot} ${
              index === currentIndex ? styles.active : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
