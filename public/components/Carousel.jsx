import { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carousel.css';

function Carousel() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return (
        <Swiper
            spaceBetween={30}
            effect={'slide'}
            navigation={true}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
         >
        <SwiperSlide>
            <picture>                
                <source media="(max-width: 425px)" srcset="../../src/assets/black-and-white-mobile.jpg" alt="black-and-white-mobile"/>
                <img src="../../src/assets/black-and-white.jpg" alt="black-and-white"/>
            </picture>
        </SwiperSlide>
        <SwiperSlide>
            <picture>                
                <source media="(max-width: 425px)" srcset="../../src/assets/clothes-mobile.jpg" alt="clothes-mobile"/>
                <img src="../../src/assets/clothes.jpg" alt="clothes" />
            </picture>            
        </SwiperSlide>
        <SwiperSlide>
            <picture>                
                <source media="(max-width: 425px)" srcset="../../src/assets/woman-mobile.jpg" alt="woman-mobile"/>
                <img src="../../src/assets/woman.jpg" alt="woman" />
            </picture> 
        </SwiperSlide>          
        <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
        </div>
        </Swiper>
    );
}

export default Carousel;