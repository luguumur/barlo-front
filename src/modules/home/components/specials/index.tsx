import Button from "@modules/common/components/button"
import AnchorLink from "@modules/common/components/links"
import UnderlineLink from "@modules/common/components/underline-link"
import ArrowRight from "@modules/common/icons/arrow-right"
import ChevronDown from "@modules/common/icons/chevron-down"
import ChevronRight from "@modules/common/icons/chevron-right"
import { MenuData } from "@data/home"
import { useTranslations } from "next-intl";
import Image from "next/image"

const Specials = () => {

  const t = useTranslations("Home");

  return (
    <section className="image-button">
  <div className="image-button-graphics-right hidden-xs-down">
    <img width="585" height="283" src="https://thompsonmachinery.com/content/uploads/2021/11/graphics4.png" className="img-responsive entered lazyloaded" data-lazy-src="https://thompsonmachinery.com/content/uploads/2021/11/graphics4.png" data-ll-status="loaded"/>
  </div>
  <div className="image-button-graphics-left hidden-sm-down">
    <img width="455" height="220" src="https://thompsonmachinery.com/content/uploads/2021/11/graphics5.png" className="img-responsive entered lazyloaded" data-lazy-src="https://thompsonmachinery.com/content/uploads/2021/11/graphics5.png" data-ll-status="loaded"/>
  </div>
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="">
          <div className="row js-image-button" role="toolbar">
            {MenuData.map((item, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div className="image-button-item">
                  <a href={`/${item.handle}`} target="_self">
                    <img width="242" height="242" src={item.image} className="img-responsive entered lazyloaded" alt="EQUIPMENT" data-lazy-src={item.image} data-ll-status="loaded"/>
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
  </div>
</section>
  )
}

export default Specials
