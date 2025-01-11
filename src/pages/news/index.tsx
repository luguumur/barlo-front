import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header";
import { HeaderData } from "@data/menu";
import { PartsData } from "@data/parts";

import { useTranslations } from "next-intl";
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import TestiCarousel from "@/modules/layout/components/testimonials-carousel";
import { News } from "@/data/news";
import MasonryGrid from "@/modules/layout/components/masonry";
import axios from "axios";
import https from "https";
import { useRouter } from "next/router";
import Link from "next/link";
import NewsBeside from "@/modules/layout/components/news-menu";
import { url } from "inspector";
import Head from "@/modules/common/components/head";
import Footer from "@/modules/layout/templates/footer";
import Nav from "@/modules/layout/templates/nav";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.query;
  // console.log(category)
  let url = "/news?category_id=clwadx50c000l6j9zj1il26yd";
  if (category) {
    url = `/news?category_id=${category}`;
  }
  const instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  let config = {
    method: "get",
    rejectUnauthorized: false,
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}${url}`,
    headers: {},
  };
  // console.log(config)
  const news = await instance.request(config);

  let cateconfig = {
    method: "get",
    rejectUnauthorized: false,
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/news-category`,
    headers: {},
  };
  const newsCategory = await instance.request(cateconfig);

  return {
    props: {
      data: news?.data,
      category: newsCategory?.data,
      messages: (await import(`../../../messages/${context.locale}.json`)).default,
    },
  };
};

const NewsPage: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
  const { locale, locales, route, asPath } = useRouter();
  const t = useTranslations("Menu");
  return (
    <>
      <Head title={t(`news`)}></Head>
      <Nav />
      <PageHeader
        title={t(`news`)}
        sub={{ title: t(`about`), handle: "/about" }}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image-1536x306.jpg"
      />
      <article className="page-body container page type-page status-publish hentry" id="page-body">
        <main className="page-content col-md-9 col-md-push-3">
          {/* <h3>News</h3>
            <p>Progress never stops. And neither do we. Explore the latest news and recent events in the world of Caterpillar.</p>
            <hr /> */}
          {props.data.map((item: any, index: any) => (
            <div id={index} key={index} className="post">
              <h3 className="post__title">
                <Link href={`/news/${item.id}`} passHref>
                  {locale === "mn" ? item.title : item.title_en}
                </Link>
              </h3>
              <div className="post__date-categories">
                <span>{item.created_at.split("T")[0]}</span>
                <span className="pull--right push--right">
                  <b>Categories: </b>
                  <span className="categories">
                    <b>{locale === "mn" ? item.category.name : item.category.name_en}</b>
                  </span>
                </span>
              </div>
              <div className="post__entry min-h-[200px]">
                <img
                  width="300"
                  height="200"
                  src={"https://webapi.barloworld.mn/file/" + item.thumbnail}
                  className="alignleft img-responsive wp-post-image"
                  alt="Barloworld Mongolia"
                  decoding="async"
                  sizes="(max-width: 300px) 100vw, 300px"
                />
                {locale === "mn" ? item.subtitle : item.subtitle_en}
                <p>
                  <a
                    className="btn btn-primary"
                    href={`/news/${item.id}`}
                    title={locale === "mn" ? item.title : item.title_en}
                  >
                    {" "}
                    {t("learnmore")}{" "}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </main>
        <NewsBeside category={props.category} />
      </article>
      <Footer />
    </>
  );
};
export default NewsPage;
