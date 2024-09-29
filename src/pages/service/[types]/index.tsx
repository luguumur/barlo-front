import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header";
import { HeaderData } from "@data/menu";
import { PartsData } from "@data/parts";

import { useTranslations } from "next-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ServiceData } from "@/data/service";
import Markdown from "react-markdown";
import { useRouter } from "next/router";
import Head from "@/modules/common/components/head";
import Nav from "@/modules/layout/templates/nav";
import Footer from "@/modules/layout/templates/footer";

const Parts: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
  const t = useTranslations("Menu");
  const data = props.data;
  const { locale, locales, route, asPath } = useRouter();
  return (
    <>
      <Head title={t(data.title)}></Head>
      <Nav />
      <PageHeader
        title={t(data.title)}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image-1536x306.jpg"
      />
      <article className="page-body container page type-page status-publish hentry" id="page-body">
        <div className="row">
          <main className="page-content col-md-9 col-md-push-3">
            {data.content && <Markdown>{locale === "mn" ? data.content : data.content_en}</Markdown>}
            {data.youtube && <div dangerouslySetInnerHTML={{ __html: data.youtube }}></div>}
          </main>
          <Beside menu={PartsData} title={t(`service`)} translate="Menu" />
        </div>
      </article>
      <Footer />
    </>
  );
};

export default Parts;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const service = ServiceData.find((service) => service.title === context?.params?.types);

  return {
    props: {
      data: service,
      messages: (await import(`../../../../messages/${context.locale}.json`)).default,
    },
  };
};
