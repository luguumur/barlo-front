import Beside from "@modules/layout/components/beside-menu";
import { HeaderData } from "@data/menu";

import { useTranslations } from "next-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import axios from "axios";
import https from "https";
import { useRouter } from "next/router";
import Markdown from "react-markdown";
import Head from "@/modules/common/components/head";
import PageHeader from "@modules/layout/components/page-header";
import Nav from "@/modules/layout/templates/nav";
import Footer from "@/modules/layout/templates/footer";

const Parts: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
  const t = useTranslations("Menu");
  const data = props.data;
  const { locale } = useRouter();
  return (
    <>
      <Head title={t(`testimonials`)}></Head>
      <Nav />
      <PageHeader
        title={t("testimonials")}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image-1536x306.jpg"
      />
      <article className="page-body container page type-page status-publish hentry" id="page-body">
        <div className="row">
          <main className="page-content col-md-9 col-md-push-3">
            {data.description && <Markdown>{locale === "mn" ? data.description : data.description_en}</Markdown>}
          </main>
          <Beside menu={HeaderData} title={t(`testimonials`)} translate="Menu" />
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
    url: `${process.env.apiDomain}/testimonials/${id}`,
    headers: {},
  };
  const testimonials = await instance.request(config);
  // console.log(testimonials.data)
  return {
    props: {
      data: testimonials.data,
      messages: (await import(`../../../../messages/${context.locale}.json`)).default,
    },
  };
};
