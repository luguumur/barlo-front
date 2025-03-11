"use client";
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {
  deals?: any;
  locale?: any;
  description?: string | null;
  image?: string | null;
};
const imageLoader = ({ src, width }: { src: any; width: any }) => {
  return `https://webapi.barloworld.mn/file/${src}`;
};

const OfferCarousel: React.FC<Props> = ({ deals, description, locale, image }) => {
  const sliderRef = useRef<Slider | null>(null);

  const t = useTranslations("Deals");
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  }, []);
  console.log(deals);
  const settings: any = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    className: "home-deals-box js-home-deals-slider",
  };
  return (
    <section className="home-deals">
      <div className="home-deals-content-wrapper">
        <div className="container">
          <div className="home-deals-header">
            <h2>{t("deals_specials")}</h2>
            <a
              href="/deals-specials/"
              target="_self"
              className="home-deals-header__link hidden-xs-down uppercase font-bold"
            >
              {t("view_all")}
              <span className="pl-1 icon-chevron-right"></span>
            </a>
          </div>
          <Slider ref={(slider) => (sliderRef.current = slider)} {...settings} role="listbox" aria-label="Deals slider">
            {deals?.map((deal: any, index: any) => (
              <div key={index}>
                <div
                  className="home-deals-item slick-slide slick-current slick-active"
                  data-slick-index={index}
                  aria-hidden={index === 0 ? "false" : "true"}
                  tabIndex={0}
                >
                  <div className="home-deals-item-box clearfix">
                    <div className="home-deals-image">
                      <Image
                        alt={deal.title}
                        src={deal.img_path}
                        width={800}
                        height={600}
                        priority
                        sizes="(max-width: 768px) 100vw, 800px"
                        loader={imageLoader}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="home-deals-content">
                      <h3>{locale == "mn" ? deal.title : deal.title_en}</h3>
                      <p>{deal.subtitle}</p>
                      <a href={`/deals-specials/${deal.id}`} className="btn btn-primary" tabIndex={index}>
                        {t("view")}
                      </a>
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

// components/EmblaCarousel.tsx
// import React, { useRef } from 'react';
// import EmblaCarousel from 'embla-carousel-react';
// import styles from '../HomeCarousel.module.css';
// import { DotButton, useDotButton } from '../EmblaCarouselDotButton';

// interface EmblaCarouselProps {
//   deals: any[];
//   locale: any;
// }

// const OfferCarousel: React.FC<EmblaCarouselProps> = ({ deals, locale }) => {
//   console.log(deals)
//   const [emblaRef, emblaApi] = EmblaCarousel({ loop: true });
//   const { selectedIndex, scrollSnaps, onDotButtonClick } =
//     useDotButton(emblaApi)
//   return (
//     <section className='masthead'>
//       <div className={styles.embla} ref={emblaRef}>
//         <div className={styles.embla__container}>
//           {deals?.map((deal, index) => (
//             <div className={styles.embla__slide} key={index}>
//               <img src={`${process.env.apiDomain}/file/${deal.imageurl}`} alt={`Slide ${index}`} />
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className='container'>
//         <div className={styles.embla__controls}>
//           <div className={styles.embla__dots}>
//             {scrollSnaps.map((_, index) => (
//               <DotButton
//                 key={index}
//                 onClick={() => onDotButtonClick(index)}
//                 className={styles.embla__dot.concat(
//                   index === selectedIndex ? ` ${styles['embla__dot--selected']}` : ''
//                 )}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OfferCarousel;
