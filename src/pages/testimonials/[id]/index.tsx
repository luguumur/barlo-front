import Beside from "@modules/layout/components/beside-menu"
import PageHeader from "@modules/layout/components/page-header"
import { HeaderData } from "@data/menu";
import { PartsData } from "@data/parts";

import { useTranslations } from "next-intl";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ServiceData } from "@/data/service";
import { Technology } from "@/data/technology";
import { Testimonials } from "@/data/testimonials";
import axios from "axios";
import https from "https";
import { useRouter } from "next/router";
import Markdown from "react-markdown";
import Head from "@/modules/common/components/head";

const Parts: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
    const t = useTranslations("Menu");
    const data = props.data
    const {locale, locales, route, asPath} = useRouter();
    return (
        <>
          <Head title={t(`testimonials`)}></Head>
            <PageHeader title={t('testimonials')} image="https://thompsonmachinery.com/content/uploads/2022/06/cta-banner-image-1536x306.jpg"/>
            <article className="page-body container post-7 page type-page status-publish hentry" id="page-body">
                <div className="row test ">
                    <main className="page-content col-md-9 col-md-push-3">
                        {data.description && <Markdown>{locale === "mn" ? data.description : data.description_en }</Markdown>}
                    </main>
                    <Beside menu={HeaderData} title={t(`testimonials`)} translate="Menu"/>
                </div>
            </article>
        </>
    )
}
  
export default Parts

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context?.params?.id
    const instance = axios.create({
        httpsAgent: new https.Agent({  
          rejectUnauthorized: false
        })
      });
      
      let config = {
        method: 'get',
        rejectUnauthorized: false,
        maxBodyLength: Infinity,
        url: `${process.env.apiDomain}/testimonials/${id}`,
        headers: { }
      };
    const testimonials = await instance.request(config)
      console.log(testimonials.data)
    return {
      props: {
          data: testimonials.data,
          messages: (await import(`../../../../messages/${context.locale}.json`)).default
      },
    };
};