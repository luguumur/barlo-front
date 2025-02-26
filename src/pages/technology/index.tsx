import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header";
import { HeaderData } from "@data/menu";
import { Technology } from "@/data/technology";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import Head from "@/modules/common/components/head";
import Image from "next/image";
import Nav from "@/modules/layout/templates/nav";
import Footer from "@/modules/layout/templates/footer";

const New = () => {
  const t = useTranslations("Menu");
  return (
    <>
      <Head title={t(`technology`)}></Head>
      <Nav />
      <PageHeader title={t(`technology`)} image="/assets/img/technology/header.jpeg" />
      <article className="page-body container page type-page status-publish hentry" id="page-body">
        <div className="row">
          <main className="page-content col-md-9 col-md-push-3">
            <section className="flexible-image-cards">
              <div className="container">
                <div className="flexible-image-cards-header"></div>
                <div className="flexible-image-cards-listing">
                  <div className="row js-equal-heights">
                    {Technology.map((item: any, index: any) => (
                      <div key={index} className="col-sm-4">
                        <div className="image-cards-box">
                          <a href={item.handle}>
                            <div className="card-image">
                              <Image fill src={item.image} alt={""} />
                            </div>
                            <div className="image-card-content js-equal-heights-item h-[98px]">
                              <div className="image-card-btn">
                                <span className="image-card-btn-text">{t("learnmore")}</span>
                                <div className="image-card-btn-clippy">
                                  <span className="icon-right"></span>
                                </div>
                              </div>
                              <h3>{t(`${item.title}`)}</h3>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Beside menu={HeaderData} title={t(`technology`)} translate="Menu" />
        </div>
      </article>
      <Footer />
    </>
  );
};

export default New;

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
