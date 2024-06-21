import { HeaderData } from "@/data/menu";
import Beside from "@/modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header"
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { useTranslations } from "next-intl";
import axios from "axios";
import https from "https";
import { useRouter } from "next/router";

const Job: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
    const t = useTranslations("Menu");
    const {locale, locales, route, asPath} = useRouter();
    return (
        <>
        <PageHeader title={locale === "mn" ? props.job.title : props.job.title_en}/>
        <article className="page-body container post-19 page type-position status-publish hentry" id="page-body">
            <div className="row test ">
                <main className="page-content col-md-9 col-md-push-3">
                <div dangerouslySetInnerHTML={{ __html: locale === "mn" ? props.job.description : props.job.description_en }}>
                </div>
                </main>
                <Beside menu={HeaderData} title={t('home')} translate="Menu"/>
            </div>
        </article>
        </>
    )
}

export default Job

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.jobs
    const instance = axios.create({
      httpsAgent: new https.Agent({  
        rejectUnauthorized: false
      })
    });
    let detailConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.apiDomain}/jobs/${id}`,
        headers: { }
      };
    
    const job = await instance.request(detailConfig)
    console.log(job.data)
    return {
        props: {
            job: job.data,
            messages: (await import(`../../../../messages/${context.locale}.json`)).default
        },
    };
  };