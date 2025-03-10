import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header";
import { HeaderData } from "@data/menu";
import { ServiceData } from "@data/service";

import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import Head from "@/modules/common/components/head";
import Nav from "@/modules/layout/templates/nav";
import Image from "next/image";
import Footer from "@/modules/layout/templates/footer";
import me from "../../../public/assets/img/service/location.jpg";

const Parts = () => {
  const t = useTranslations("Menu");
  const myLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <Head title={t(`service`)}></Head>
      <Nav />
      <PageHeader title={t(`service`)} image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/SERVIC_20211109.jpg" />
      <section className="wysiwyg-section">
        <div className="container">
          <h3 id="power-systems-service-and-support">БҮТЭЭГДЭХҮҮН ДЭМЖИХ YЙЛЧИЛГЭЭ</h3>
          <p>
            Бид таны машины эд ангийн ашиглалтыг бүрэн утгаар нь дэмжиж ажиллана. Машин тоног төхөөрөмж болон эд ангийг
            шинээр худалдан авах зардлыг багасгаж, насжилтыг уртасгах боломжтой
          </p>
          <ul>
            <li>Агрегат үйлдвэрлэлийн төв</li>
            <li>Засвар үйлчилгээний төв</li>
            <li>Сэлбэг & технологи</li>
          </ul>
          <div className="row">
            <div className="col-sm-5 form-field">
              <a href="/assets/pdf/ProductSupportServiceBrochure.pdf" target="blank">
                <button className="btn btn-primary button--block" type="submit">
                  брошур үзэх
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="service-card-with-featured-image">
        <div className="container">
          <h3>Our Services</h3>
          <div className="service-card-with-featured-image__list">
            {ServiceData.map((item: any, index: any) => (
              <div className="service-card-with-featured-image__item" key={index}>
                <article className="service-card-with-featured-image__card">
                  <a className="service-card-with-featured-image__link" href={item.handle}>
                    <div className="service-card-with-featured-image__image">
                      {/* <img src={item.image} alt="" /> */}
                      <Image loader={myLoader} fill src={item.image} alt={item.title} />
                    </div>
                    <div className="service-card-with-featured-image__content">
                      <h5>{t(`${item.title}`)}</h5>
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
            <p>
              {" "}
              УБ хотод төвтэй дуудлагын засвар үйлчилгээний хэлтэс маань Монгол орон даяар 24/7 үйлчилгээг үзүүлдэг. 50
              гаруй мэргэжлийн механикчид, 20 орчим хүргэлтийн автомашин, хөдөө орон нутагт байрлах гурван салбар нь
              танд бүх төрлийн засвар үйлчилгээ,оношилгоо, угсралт, задаргааг санал болгож байна.
            </p>
          </div>
        </div>
      </section>
      <section className="wysiwyg-section">
        <div className="container">
          <h3 id="load-bank-testing">
            More choice to keep<br></br> your business moving
          </h3>
          <p>Таны бизнесийн зогсолтгүй урагшлах сонголтууд.</p>
        </div>
      </section>
      <section className="wysiwyg-section">
        <div className="container">
          <Image
            src={me}
            sizes="100vw"
            alt="Barloworld Mongolia"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Parts;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = {};
  }
  return {
    props: {
      messages,
    },
  };
}
