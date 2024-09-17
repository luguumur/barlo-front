import Head from "@/modules/common/components/head";
import Questions from "@/modules/layout/components/questions";
import PageHeader from "@modules/layout/components/page-header"
import axios from "axios";
import https from "https";
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import Markdown from 'react-markdown'

const Deals: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
  const {locale, locales, route, asPath} = useRouter();
    return (
      <>
        <Head title={locale === "mn" ? props.detail.title : props.detail.title_en}></Head>
        <PageHeader title={locale === "mn" ? props.detail.title : props.detail.title_en}/>
        <article className="page-body container post-97908 deals_specials type-deals_specials status-publish has-post-thumbnail hentry" id="page-body">
          <div className="row">
            <main className="page-content col-md-9 col-md-push-3">
              <Markdown>{locale === "mn" ? props.detail.description : props.detail.description_en }</Markdown>
            </main>
            <aside className="page-sidebar  col-md-3 col-md-pull-9">
              <Questions/>
            </aside>
          </div>
        </article>
      </>
    )
  }
  
export default Deals


export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.deals
  const instance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
  let detailConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.apiDomain}/deals/${id}`,
      headers: { }
    };
  
  const detail = await instance.request(detailConfig)
  // console.log(detail)
  return {
      props: {
          detail: detail.data,
          messages: (await import(`../../../../messages/${context.locale}.json`)).default
      },
  };
};