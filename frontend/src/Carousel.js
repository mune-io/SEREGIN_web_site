import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./Carousel.css"; // вынесем стили сюда (можешь поменять название)

const Carousel = ({ slides }) => (
  <div className="carousel-wrapper">
    <Swiper
      navigation
      modules={[Navigation,]}  // Autoplay
      loop={true}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      direction="horizontal"

      className="carousel-swiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="carousel-slide">
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default Carousel;
