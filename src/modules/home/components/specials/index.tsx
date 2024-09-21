import { MenuData } from "@/data/home";
import { useTranslations } from "next-intl";
import Image from 'next/image';

const Specials = () => {
  const t = useTranslations("Home");

  return (
    <section className="image-button">
      <div className="image-button-graphics-right">
        <Image
          src={"https://d3leeb4r1qy96s.cloudfront.net/assets/img/graphics4.webp"}
          className="img-responsive"
          width={280}
          height={280}
          alt="Graphics 4"
          priority
        />
      </div>
      <div className="image-button-graphics-left">
        <div className="aspect-w-480 aspect-h-240 relative">
          <Image
            src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/graphics5.webp"
            className="img-responsive"
            width={480}
            height={240}
            alt="Graphics 5"
            priority
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row js-image-button" role="toolbar">
              {MenuData.map((item, index) => (
                <div key={index} className="col-md-3 col-sm-6">
                  <div className="image-button-item">
                    <a href={`/${item.handle}`} target="_self">
                      <div className="image-container relative w-full h-[242px]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          quality={75}
                          priority={index === 0} // Example to prioritize the first image
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                      <div className="image-button-overlay">
                        <div className="image-button-overlay-content">
                          <div className="image-button-title">
                            <span className="image-button-title-wrap">{t(`${item.title}`)}</span>
                            <div className="image-button-title-clippy">
                              <span className="arrow-icon">
                                <span></span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specials;
