"use client"
// components/Carousel.tsx
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';

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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    nextArrow: <SampleNextArrow className="test"/>,
    prevArrow: <SamplePrevArrow className="test"/>
  };
  
  return (
    <>
    <section className="masthead">
      <div className="js-masthead-homepage-slider slick-initialized slick-slider">
        <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
        <>
          <div className="background-image-wrapper">
              <img width="1920" height="670" className="homepage-masthead-bg entered lazyloaded" src="/home.png" alt="" data-ll-status="loaded"/>
          </div>
          <div className="container hp-slide-content">
            <div className="row">
              <div className="col-sm-12 col-lg-8">
                  <h2 className="h2 hp-mast-subheading">You Expect It. </h2>
                  <h2 className="h1 hp-mast-heading">We Deliver.</h2>
                  <a className="btn btn-primary" href="#" target="_self" >Reserve Your Rental Today </a>
              </div>
            </div>
          </div>
        </>
        <>
          <div className="background-image-wrapper">
              <img width="1920" height="670" className="homepage-masthead-bg entered lazyloaded" src="/home.png" alt="" data-ll-status="loaded"/>
          </div>
          <div className="container hp-slide-content">
            <div className="row">
              <div className="col-sm-12 col-lg-8">
                  <h2 className="h2 hp-mast-subheading">Find Quality </h2>
                  <h2 className="h1 hp-mast-heading">Used Equipment</h2>
                  <a className="btn btn-primary" href="#" target="_self" >View Available Used Equipment </a>
              </div>
            </div>
          </div>
        </>
        </Slider>
      </div>
    </section>
    </>
  );
};

export default Carousel;
