import { MenuData } from "@/data/home";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Specials = () => {
  const t = useTranslations("Home");

  return (
    <section className="mb-9">
      <div className="image-button-graphics-right">
        <Image
          src={"https://d3leeb4r1qy96s.cloudfront.net/assets/img/graphics4.webp"}
          className="img-responsive"
          width={280}
          height={280}
          alt="Graphics 4"
          priority
          loading={"eager"}
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
            loading={"eager"}
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row js-image-button" role="toolbar">
              {MenuData.map((item, index) => (
                <div key={index} className="col-md-3 col-sm-6 mb-6">
                  <div className="image-button-item min-h-[242px]">
                    <a href={`/${item.handle}`} target="_self">
                      <div className="image-container relative w-full h-[242px]">
                        <Image
                          alt={item.title}
                          src={item.image}
                          quality={75}
                          fill
                          loading={"eager"}
                          sizes="50vw"
                          style={{
                            objectFit: "cover",
                          }}
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
