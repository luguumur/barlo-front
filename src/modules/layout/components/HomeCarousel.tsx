// components/EmblaCarousel.tsx
import React, { useRef } from 'react';
import EmblaCarousel from 'embla-carousel-react';
import styles from './HomeCarousel.module.css';
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

interface EmblaCarouselProps {
    slides: any[];
}

const HomeCarouselComponent: React.FC<EmblaCarouselProps> = ({ slides }) => {
    const [emblaRef, emblaApi] = EmblaCarousel({ loop: true });
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)
    return (
        <section className='masthead'>
            <div className={styles.embla} ref={emblaRef}>
                <div className={styles.embla__container}>
                    {slides.map((slide, index) => (
                        <div className={styles.embla__slide} key={index}>
                            <img src={`${process.env.apiDomain}/file/${slide.imageurl}`} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.embla__controls}>
                <div className={styles.embla__dots}>
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={styles.embla__dot.concat(
                                index === selectedIndex ? styles['embla__dot--selected'] : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeCarouselComponent;
