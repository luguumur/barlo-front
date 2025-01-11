// components/EmblaCarousel.tsx
import React, { useRef } from "react";
import EmblaCarousel from "embla-carousel-react";
import styles from "./HomeCarousel.module.css";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import Image from "next/image";
import { relative } from "path";
import LoadingSection from "./LoadingSection";

interface EmblaCarouselProps {
  slides: any[];
}

const HomeCarouselComponent: React.FC<EmblaCarouselProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = EmblaCarousel({ loop: true });
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const myLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  if (!slides) return <LoadingSection />;

  return (
    <section className="masthead">
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div className={styles.embla__slide} key={index}>
              <Image
                loader={myLoader}
                src={`https://d3leeb4r1qy96s.cloudfront.net/${slide.imageurl}`}
                alt={`barloworld Mongolia ${index + 1}`}
                quality={75}
                fill
                priority={index === 0} // Only prioritize the first image
                loading={index === 0 ? "eager" : "lazy"}
                sizes="100vw" // Simplified sizes as it's a full-width carousel
                placeholder="blur" // Add blur placeholder
                blurDataURL={`data:image/svg+xml;base64,...`} // Add appropriate blur data
                style={{
                  objectFit: "cover",
                  transform: "translate3d(0, 0, 0)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* <div className='container'>
                <div className={styles.embla__controls}>
                    <div className={styles.embla__dots}>
                        {scrollSnaps.map((_, index) => (
                            <DotButton
                                key={index}
                                onClick={() => onDotButtonClick(index)}
                                className={styles.embla__dot.concat(
                                    index === selectedIndex ? ` ${styles['embla__dot--selected']}` : ''
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div> */}
    </section>
  );
};

export default HomeCarouselComponent;
