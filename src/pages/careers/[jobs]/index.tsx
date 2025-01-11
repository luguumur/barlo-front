import { HeaderData } from "@/data/menu";
import Beside from "@/modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header";
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { useTranslations } from "next-intl";
import axios from "axios";
import https from "https";
import { useRouter } from "next/router";
import Markdown from "react-markdown";
import Head from "@/modules/common/components/head";
import Link from "next/link";
import Footer from "@/modules/layout/templates/footer";
import Nav from "@/modules/layout/templates/nav";
import { AboutMenuData } from "@/data/aboutMenu";

const Job: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
  const t = useTranslations("Menu");
  const { locale, locales, route, asPath } = useRouter();
  return (
    <>
      <Head title={locale === "mn" ? props.job.title : props.job.title_en}></Head>
      <Nav />
      <PageHeader
        title={locale === "mn" ? props.job.title : props.job.title_en}
        sub={{ title: t(`careers`), handle: "/careers" }}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image-1536x306.jpg"
      />
      <article className="page-body container page type-position status-publish hentry" id="page-body">
        <div className="row">
          <main className="page-content col-md-9 col-md-push-3">
            <div className="widget-even widget-2 black widget wpcm_closest_location text-center py-10">
              <h5 className="font-bold ">{locale === "mn" ? props.job.title : props.job.title_en}</h5>
            </div>
            <Markdown>{locale === "mn" ? props.job.description : props.job.description_en}</Markdown>
            <Link
              href={`/application?title=${locale === "mn" ? props.job.title : props.job.title_en}`}
              className="btn btn-primary mb-16"
              type="submit"
            >
              Анкет илгээх
            </Link>
          </main>
          <Beside menu={AboutMenuData} title={t("careers")} translate="Menu" />
        </div>
      </article>
      <Footer />
    </>
  );
};

export default Job;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.jobs;
  const instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
  let detailConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/jobs/${id}`,
    headers: {},
  };

  const job = await instance.request(detailConfig);
  // console.log(job.data)
  return {
    props: {
      job: job.data,
      messages: (await import(`../../../../messages/${context.locale}.json`)).default,
    },
  };
};
