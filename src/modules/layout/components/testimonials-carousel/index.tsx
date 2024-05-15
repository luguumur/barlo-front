"use client"
// components/Carousel.tsx
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';

const TestiCarousel: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    // Access the slick slider instance via the ref and configure it here
    if (sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings} className='p-0'>
    <div className='h-[400px]'>
        <div className="home-testimonials-slider-item-column z-10">
            <h4>“Cat бол Дэлхийн брэнд учраас операторын ажиллах орчныг дээд зэргээр хангасан...”</h4>
            <h5 className='pb-5'>
            <span className="title-wrap">
                <span>—</span> “Эрдэнэс Таван Толгой” ХК-н Оператор - Ц.Мөнхбат </span>
            </h5>
        </div>
    </div>
    <div className='h-[400px]'>
        <div className="home-testimonials-slider-item-column z-10">
            <h4>“Найдвартай ажиллагаанд итгэлтэй байдаг. Чухал ид ачаалалтай үед эвдэрч саатах ямар ч асуудал гардаггүй учраас би бусдад Барловорлд компанийг санал болгодог...”</h4>
            <h5 className='pb-5'>
            <span className="title-wrap">
                <span>—</span> “Эвт Чулуу” ХХК Ерөнхий Захирал - Б.Баяржаргал </span>
            </h5>
        </div>
    </div>
    <div className='h-[400px]'>
        <div className="home-testimonials-slider-item-column z-10">
            <h4>“Парк шинэчлэлтийн хүрээнд Тендер сонгон шалгаруулалтаар бид хамгийн сайн чанартай техник авахаар Барловорлд Монголиа ХХК-г сонгосон...”</h4>
            <h5 className='pb-5'>
            <span className="title-wrap">
                <span>—</span> “Цемент шохой” ТӨХК Геологи, Уул Уурхайн Хэлтсийн Дарга Б.Ууганбаяр </span>
            </h5>
        </div>
    </div>
    </Slider>
  );
};

export default TestiCarousel;
