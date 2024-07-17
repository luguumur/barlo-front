import PageHeader from "@modules/layout/components/page-header"
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import axios from 'axios';
import https from "https";
import Questions from "@/modules/layout/components/questions";
import { useRouter } from "next/router";
import Head from "@/modules/common/components/head";

type Repo = {
  name: string
}
 
const DealsPage: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
  const deals = props.data;
  const {locale, locales, route, asPath} = useRouter();
  return (
    <> 
        <Head title={"deals & specials"}></Head>
        <PageHeader title="deals & specials"/>
        <article className="page-body container post-97908 deals_specials type-deals_specials status-publish has-post-thumbnail hentry" id="page-body">
          <div className="row">
            <main className="page-content col-md-9 col-md-push-3 specials-deals">
              <div className="row">
              {deals.map((item:any, index: any) => ( 
                  <div key={index} className="col-sm-6 box-deals">
                    <a href={`/deals-specials/${item.id}`} className="deal">
                        <h2 className="post__title"> {locale === "mn" ? item.title : item.title_en} </h2>
                        <img width="2088" height="1046" src={'https://webapi.barloworld.mn/file/'+item.img_path}className="alignleft img-responsive wp-post-image" alt="" decoding="async" sizes="(max-width: 300px) 100vw, 300px" /> 
                        <button className="button button--primary button--block"> Read More </button>
                    </a>
                  </div>
              ))}
              </div>
            </main>
            <aside className="page-sidebar  col-md-3 col-md-pull-9">
              <Questions/>
            </aside>
          </div>
        </article>
      </>
  )
}

export default DealsPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const instance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
  
  let config = {
    method: 'get',
    rejectUnauthorized: false,
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/deals`,
    headers: { }
  };
  const deals = await instance.request(config)
  return {
      props: {
        data: deals?.data,
        messages: (await import(`../../../messages/${context.locale}.json`)).default
      },
  };
};