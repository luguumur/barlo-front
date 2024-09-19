import { MenuData } from "@/data/home";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Specials = () => {
  const t = useTranslations("Home");

  return (
    <section className="image-button">
      <div className="image-button-graphics-right">
        <Image
          src={"/assets/img/graphics4.png"}
          className="img-responsive"
          width={285}
          height={283}
          alt="Graphics 4"
          priority
        />
      </div>
      <div className="image-button-graphics-left">
        <Image
          src={"/assets/img/graphics5.png"}
          className="img-responsive"
          width={455}
          height={220}
          alt="Graphics 5"
          priority
        />
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
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          alt={item.title}
                          quality={75}
                          priority
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
