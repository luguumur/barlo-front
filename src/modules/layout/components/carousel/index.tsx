'use client';

import { useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import { useTranslations } from 'next-intl';

interface CarouselProps {
  slides: any[];
}
const CarouselComponent: React.FC<CarouselProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = useTranslations();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);
  const myLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }
  return (
    <div className="relative h-full w-full ">
      <div className="relative w-full overflow-hidden rounded-lg ">
        {slides.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 px-10 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              loader={myLoader}
              src={`${process.env.apiDomain}/file/${src.imageurl}`}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              priority
              className={`transition-transform duration-1000 ease-in-out ${index === currentSlide ? 'scale-105 transform' : 'scale-100 transform'
                }`}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 transform space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`h-3 rounded-full ${currentSlide === index ? 'w-10 bg-orange-500' : 'w-3 bg-gray-300'}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default CarouselComponent;
