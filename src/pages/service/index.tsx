import Beside from "@modules/layout/components/beside-menu"
import PageHeader from "@modules/layout/components/page-header"
import { HeaderData } from "@data/menu";
import { ServiceData } from "@data/service";

import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import Head from "@/modules/common/components/head";

const Parts = () => {
  const t = useTranslations("Menu");
    return (
      <>

        <Head title={t(`service`)}></Head>
        <PageHeader title={t(`service`)} image="https://www.barloworld.mn/images/uploads2/SERVIC_20211109.jpg"/>
        <section className="wysiwyg-section">
          <div className="container">
            <h3 id="power-systems-service-and-support">БҮТЭЭГДЭХҮҮН ДЭМЖИХ YЙЛЧИЛГЭЭ</h3>
            <p>Бид таны машины эд ангийн ашиглалтыг бүрэн
утгаар нь дэмжиж ажиллана. Машин тоног
төхөөрөмж болон эд ангийг шинээр худалдан
авах зардлыг багасгаж, насжилтыг уртасгах
боломжтой</p>
            <ul>
              <li>Агрегат үйлдвэрлэлийн төв</li>
              <li>Засвар үйлчилгээний төв</li>
              <li>Сэлбэг & технологи</li>
            </ul>
            <div className="row">
              <div className="col-sm-5 form-field">
                <a href="/assets/pdf/ProductSupportServiceBrochure.pdf" target="blank">
                  <button className="button button--primary button--block" type="submit">брошур үзэх</button>
                </a>
              </div>
          </div>
          </div>
          
        </section>
        <section className="service-card-with-featured-image">
          <div className="container">
            <h3>Our Services</h3>
            <div className="service-card-with-featured-image__list">
              {ServiceData.map((item:any, index: any) => (
                <div className="service-card-with-featured-image__item" key={index}>
                  <article className="service-card-with-featured-image__card">
                    <a className="service-card-with-featured-image__link" href={item.handle}>
                      <div className="service-card-with-featured-image__image">
                        
                      </div>
                      <div className="service-card-with-featured-image__content">
                        <h5>{item.title}</h5>
                        <span className="icon">
                          <span></span>
                        </span>
                      </div>
                    </a>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="call-action-bar-section" className="call-action-bar-section">
          <div className="container clearfix">
            <div className="header-text">
              <h3>Монгол орон даяар 24/7 үйлчилгээг үзүүлдэг</h3>
            </div>
            <div className="header__lower">
              <p> УБ хотод төвтэй дуудлагын засвар үйлчилгээний хэлтэс маань Монгол орон даяар 24/7 үйлчилгээг үзүүлдэг. 50 гаруй мэргэжлийн механикчид, 20 орчим хүргэлтийн автомашин, хөдөө орон нутагт байрлах гурван салбар нь танд бүх төрлийн засвар үйлчилгээ,оношилгоо, угсралт, задаргааг санал болгож байна.</p>
            </div>
          </div>
        </section>
        <section className="wysiwyg-section">
          <div className="container">
            <h3 id="load-bank-testing">More choice to keep<br></br> your business moving</h3>
            <p>Таны бизнесийг зогсолтгүй урагшлах сонголтууд.</p>
          </div>
        </section>
      </>
    )
  }
  
export default Parts


export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default
    }
  };
}