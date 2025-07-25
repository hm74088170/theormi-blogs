import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';


const Scroller = () => {

  return (
    <Swiper
  modules={[Autoplay]}
  spaceBetween={50}
  slidesPerView={1}
  autoplay={{
    delay: 2000,
    disableOnInteraction: false,
  }}
  onSlideChange={() => console.log('slide change')}
  onSwiper={(swiper) => console.log(swiper)}
>
  <SwiperSlide>
    <div className='w-full h-[400px] bg-[url(/images/img1.jpg)] bg-cover bg-center'></div>
  </SwiperSlide>
  <SwiperSlide>
    <div className='w-full h-[400px] bg-[url(/images/img2.jpg)] bg-cover bg-center'></div>
  </SwiperSlide>
  <SwiperSlide>
    <div className='w-full h-[400px] bg-[url(/images/img3.jpg)] bg-cover bg-center'></div>
  </SwiperSlide>
  <SwiperSlide>
    <div className='w-full h-[400px] bg-[url(/images/img4.jpg)] bg-cover bg-center'></div>
  </SwiperSlide>
</Swiper>

  );
};
 export default Scroller