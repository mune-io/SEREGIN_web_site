import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./Carousel.css"; // 


// const  slideDataSmal = [<img src="image1.jpg" alt="Slide 1" className="carousel-image" />,  <img src="image2.jpg" alt="Slide 2" className="carousel-image" />,   <img src="image3.jpg" alt="Slide 3" className="carousel-image" />]




const CarouselSmall = ({ slides }) => {
  return (
    <div className="carousel-container-small">
      <Swiper
        navigation
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselSmall;
