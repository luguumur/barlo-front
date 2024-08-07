// components/EmblaCarousel.tsx
import React, { useRef } from 'react';
import EmblaCarousel from 'embla-carousel-react';
import styles from './EmblaCarousel.module.css';

interface EmblaCarouselProps {
  alt: string;
  main: string;
  slides: any[];
}

const EmblaCarouselComponent: React.FC<EmblaCarouselProps> = ({main,alt, slides }) => {
  const [emblaRef, emblaApi] = EmblaCarousel({ loop: true });
  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.embla__container}>
        <div className={styles.embla__slide}>
          <img src={`${process.env.apiDomain}/file/${main}`} alt={alt} />
        </div>
        {slides.map((slide, index) => (
          <div className={styles.embla__slide} key={index}>
            <img src={`${process.env.apiDomain}/file/${slide.path}`} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmblaCarouselComponent;
