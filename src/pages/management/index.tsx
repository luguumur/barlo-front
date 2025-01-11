import PageHeader from "@modules/layout/components/page-header";
import { teamData } from "@data/teamData";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import Image from "next/image";
import Head from "@/modules/common/components/head";
import Footer from "@/modules/layout/templates/footer";
import Nav from "@/modules/layout/templates/nav";

const Management = () => {
  const imageLoader = ({ src, width }: { src: any; width: any }) => {
    return `${process.env.apiDomain}/file/${src}`;
  };
  const t = useTranslations("Menu");
  return (
    <>
      <Head title={t(`board`)}></Head>
      <Nav />
      <PageHeader
        title={t(`board`)}
        sub={{ title: t(`about`), handle: "/about" }}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/hr/management.jpg"
      />
      <article className="page-body container page type-page status-publish hentry">
        <div className="container">
          <h2>{t(`board`)}</h2>
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <div className="row js-image-button" role="toolbar">
                  {teamData.map((item, index) => (
                    <div key={index} className="col-md-3 col-sm-6">
                      <div className="image-button-item">
                        <img
                          width="242"
                          height="242"
                          src={item.image}
                          className="img-responsive entered lazyloaded"
                          alt={item.name}
                          data-lazy-src={item.image}
                          data-ll-status="loaded"
                        />
                        <div className="image-button-overlay">
                          <div className="image-button-overlay-content">
                            <div className="image-button-title grid">
                              <span className="image-button-title-wrap">{item.name}</span>
                              <span className="text-sm">{item.pos}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <center>
                    <img
                      src="https://d3leeb4r1qy96s.cloudfront.net/assets/img/ORG CHART1.jpg"
                      alt="Barloworld Mongolia"
                    />
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
};

export default Management;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
