"use client"
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image'

type Props = {
  deals?: any
  locale?: any
  description?: string | null
  image?: string | null
}
const imageLoader = ({ src, width } : {src:any, width:any}) => {
  return `https://webapi.barloworld.mn/file/${src}`
}

const OfferCarousel: React.FC<Props> = ({ deals, description, locale, image }) => {
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  }, []);

  const settings:any = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    className: 'home-deals-box js-home-deals-slider',
  };
  return (
    <section className="home-deals ">
      <div className="home-deals-content-wrapper">
        <div className="container">
          <div className="home-deals-header">
            <h2>DEALS &amp; SPECIALS</h2>
            <a href="/deals-specials/" target="_self" className="home-deals-header__link hidden-xs-down">VIEW ALL DEALS &amp; SPECIALS <span className="icon-chevron-right"></span>
            </a>
          </div>
          <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
              {deals?.map((deal:any, index:any) => (
                  <div key={index}>
                    <div className="home-deals-item slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" style={{"width":"1314px","position":"relative","left":"0px","top":"0px","zIndex":"999","opacity":"1"}} tabIndex={0} role="option" aria-describedby="slick-slide10">
                        <div className="home-deals-item-box clearfix">
                          <div className="home-deals-image">
                              <Image loader={imageLoader} src={deal.img_path} width={500} height={500} alt={deal.title} className="img-responsive entered lazyloaded"></Image>
                          </div>
                          <div className="home-deals-content">
                              <h3>{locale == "mn" ? deal.title : deal.title_en}</h3>
                              <p>{deal.subtitle}</p>
                              <a href={`/deals-specials/${deal.id}`} className="btn btn-primary" tabIndex={index}>VIEW DEAL</a>
                          </div>
                        </div>
                    </div>
                  </div>
              ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

// const myLoader=({src}:any)=>{
//   return `http://52.77.143.7:8000/file/${src}`;
// }

export default OfferCarousel;
