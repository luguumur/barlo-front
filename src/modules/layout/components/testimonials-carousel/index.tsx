"use client";
import { useTranslations } from "next-intl";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
// components/Carousel.tsx
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
type Props = {
  testi?: any;
  locale?: any;
  description?: string | null;
  image?: string | null;
};
const TestiCarousel: React.FC<Props> = ({ testi, description, image }) => {
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
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const t = useTranslations("Menu");
  const { locale, locales, route, asPath } = useRouter();
  return (
    <div className="home-testimonials clearfix">
      <div className="home-testimonials-wrapper clearfix">
        <div className="home-testimonials-banner hidden-md-down">
          <Image
            priority
            width={831}
            height={625}
            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/test.jpg"
            className="img-responsive entered lazyloaded"
            alt="Barloworld Mongolia"
            loading={"eager"}
          />
        </div>
        <div className="home-testimonials-right-panel">
          <div className="home-testimonials-header">
            <h2>
              <span>Hear From</span> Our Customers
            </h2>
          </div>
          <div className="home-testimonials-slider-wrapper">
            <div className="home-testimonials-slider home-testimonials-slider-homepage slick-initialized slick-slider">
              <Slider {...settings} className="p-0">
                {testi?.map((item: any, index: any) => (
                  <div key={index} className="h-[370px] !w-[350px]">
                    <div className="home-testimonials-slider-item-column z-10">
                      <div className="text-sm mb-5 text-[#1C1C1C]">
                        {locale === "mn" ? item.subtitle : item.subtitle_en}
                      </div>
                      <span className="title-wrap pb-5 font-bold text-[17px] text-[#666] uppercase">
                        <span>—{locale === "mn" ? item.title : item.title_en}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <a href="/testimonials" target="_self" className="btn btn-primary">
              {" "}
              {t("learnmore")}{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestiCarousel;
