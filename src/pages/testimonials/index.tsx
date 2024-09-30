import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header";
import { HeaderData } from "@data/menu";
import { PartsData } from "@data/parts";

import { useTranslations } from "next-intl";
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import TestiCarousel from "@/modules/layout/components/testimonials-carousel";
// import { Testimonials } from "@/data/testimonials";
import MasonryGrid from "@/modules/layout/components/masonry";
import axios from "axios";
import https from "https";
import { useRouter } from "next/router";
import Head from "@/modules/common/components/head";
import Footer from "@/modules/layout/templates/footer";
import Nav from "@/modules/layout/templates/nav";
type Props = {
  params: { title: string[] };
};

const Testimonial: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
  const testimonials = props.data;
  const t = useTranslations("Menu");
  const { locale, locales, route, asPath } = useRouter();
  return (
    <>
      <Head title={t(`testimonials`)}></Head>
      <Nav />
      <PageHeader
        title={t(`testimonials`)}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image-1536x306.jpg"
      />
      <article className="page-body container page type-page status-publish hentry" id="page-body">
        <div className="row">
          <main className="page-content col-md-9 col-md-push-3">
            <section className="customer-block">
              <div className="customers">
                <MasonryGrid gap={20}>
                  {testimonials.map((item: any, index: any) => (
                    <div className="customer-container" key={item.id}>
                      <article className="customer customer--customer-stories">
                        <div className="customer__media-container customer__media-container--quote">
                          <img
                            decoding="async"
                            className="customer__media customer__media--img"
                            src={"https://webapi.barloworld.mn/file/" + item.imageUrl}
                          />
                        </div>
                        <div className="customer__details">
                          <h3 className="customer__name">{locale === "mn" ? item.title : item.title_en}</h3>
                          <div className="customer__desc">
                            <p>{locale === "mn" ? item.subtitle : item.subtitle_en}</p>
                          </div>
                          <a className="customer__link btn btn-primary" href={`/testimonials/${item.id}`}>
                            {t("learnmore")}
                          </a>
                        </div>
                      </article>
                    </div>
                  ))}
                </MasonryGrid>
              </div>
            </section>
          </main>
          <Beside menu={HeaderData} title={t(`testimonials`)} translate="Menu" />
        </div>
      </article>
      <Footer />
    </>
  );
};

export default Testimonial;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  let config = {
    method: "get",
    rejectUnauthorized: false,
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/testimonials`,
    headers: {},
  };
  const testimonials = await instance.request(config);
  return {
    props: {
      data: testimonials?.data,
      messages: (await import(`../../../messages/${context.locale}.json`)).default,
    },
  };
};
