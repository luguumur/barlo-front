import Beside from "@modules/layout/components/beside-menu"
import PageHeader from "@modules/layout/components/page-header"
import { HeaderData } from "@data/menu";
import { PartsData } from "@data/parts";

import { useTranslations } from "next-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ServiceData } from "@/data/service";
import { Technology } from "@/data/technology";
import Markdown from "react-markdown";
import { useRouter } from "next/router";
import Head from "@/modules/common/components/head";

const Parts: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
    const t = useTranslations("Menu");
    const data = props.data
    const {locale, locales, route, asPath} = useRouter();
    return (
        <>
            <Head title={t(data.title)}></Head>
            <PageHeader title={t(data.title)} image="https://thompsonmachinery.com/content/uploads/2022/06/cta-banner-image-1536x306.jpg"/>
            <article className="page-body container page type-page status-publish hentry" id="page-body">
                <div className="row">
                    <main className="page-content col-md-9 col-md-push-3">
                        {data.content && <Markdown>{locale === "mn" ? data.content : data.content_en }</Markdown>}
                        {data.youtube && <div dangerouslySetInnerHTML={{ __html: data.youtube }}></div>}
                    </main>
                    <Beside menu={Technology} title={t(`service`)} translate="Menu"/>
                </div>
            </article>
        </>
    )
}
  
export default Parts

export const getServerSideProps: GetServerSideProps = async (context) => {

    const technology = Technology.find(tech => tech.title === context?.params?.types);
  
    return {
      props: {
          data: technology,
          messages: (await import(`../../../../messages/${context.locale}.json`)).default
      },
    };
};