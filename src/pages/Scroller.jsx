import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Scroller = () => {
  const images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'];

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      className="w-full"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] bg-cover bg-center rounded"
            style={{ backgroundImage: `url(/images/${img})` }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Scroller;
