"use client"
// components/Carousel.tsx
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';

import Image from 'next/image'
type Props = {
  hero?: any
  description?: string | null
  image?: string | null
}


function SampleNextArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, left: 0, bottom: 10 }}
      onClick={onClick}
    ></div>
  );
}


const Carousel: React.FC<Props> = ({ hero, description, image }) => {
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    // Access the slick slider instance via the ref and configure it here
    if (sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  }, []);

  const settings:any = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    nextArrow: <SampleNextArrow className="test"/>,
    prevArrow: <SamplePrevArrow className="test"/>,
    className: "h-[610px] cursor-pointer",
  };
    
  const imageLoader = ({ src, width } : {src:any, width:any}) => {
    return `${process.env.apiDomain}/file/${src}`
  }
  
  return (
    <>
    <section className="masthead">
      <div className="js-masthead-homepage-slider slick-initialized slick-slider">
        <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
          {hero?.map((deal:any, index:any) => (
            <div key={index} className='homepage-masthead-slide-wrapper'>
              <div className="background-image-wrapper" style={{width: '100%', height: '670px', position: 'absolute'}}>
                <Image 
                loader={imageLoader} 
                src={deal.imageurl} 
                alt={deal.title} 
                priority
                height={960}
                width={2560}
                className=" lazyloaded homepage-masthead-bg"/>
              </div>
              <div className="container hp-slide-content">
                <div className="row">
                  <div className="col-sm-12 col-lg-8">
                      <h2 className="h2 hp-mast-subheading">ANY PART. ANYTIME. ANYWHERE.</h2>
                      <h2 className="h1 hp-mast-heading">barloworld.com</h2>
                      <a className="btn btn-primary" href="#" target="_self" >SKIP THE LINE</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
    </>
  );
};

export default Carousel;
