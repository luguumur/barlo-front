import PageHeader from "@modules/layout/components/page-header";

import { useTranslations } from "next-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios from "axios";
import https from "https";
import { useRouter } from "next/router";
import NewsBeside from "@/modules/layout/components/news-menu";
import Markdown from "react-markdown";
import Head from "@/modules/common/components/head";
import Footer from "@/modules/layout/templates/footer";
import Nav from "@/modules/layout/templates/nav";

const Parts: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
  const t = useTranslations("Menu");
  const data = props.data;
  const { locale } = useRouter();
  return (
    <>
      <Head title={data.title}></Head>
      <Nav />
      <PageHeader
        title={data.title}
        sub={{ title: t(`news`), handle: "/news" }}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image-1536x306.jpg"
      />
      <article className="page-body container page type-page status-publish hentry" id="page-body">
        <div className="row">
          <main className="page-content col-md-9 col-md-push-3">
            <div className="post__date-categories">
              <span>{data.created_at.split("T")[0]}</span>
              <span className="pull--right push--right">
                <b>Categories:</b>{" "}
                <span className="categories">
                  <b>{locale === "mn" ? data.category.name : data.category.name_en}</b>
                </span>
              </span>
            </div>
            <div>{data.content && <Markdown>{locale === "mn" ? data.content : data.content_en}</Markdown>}</div>
          </main>

          <NewsBeside category={props.category} />
        </div>
      </article>
      <Footer />
    </>
  );
};

export default Parts;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;
  const instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  let config = {
    method: "get",
    rejectUnauthorized: false,
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/news/${id}`,
    headers: {},
  };
  const news = await instance.request(config);
  //   console.log(news.data)
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
      data: news.data,
      category: newsCategory?.data,
      messages: (await import(`../../../../messages/${context.locale}.json`)).default,
    },
  };
};
