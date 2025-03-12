import Beside from "@modules/layout/components/beside-menu";
import PageHeader from "@modules/layout/components/page-header";
import { HeaderData } from "@data/menu";
import { useTranslations } from "next-intl";
import axios from "axios";
import https from "https";
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from "next";

import Image from "next/image";
import Link from "next/link";
import Head from "@/modules/common/components/head";
import Footer from "@/modules/layout/templates/footer";
import Nav from "@/modules/layout/templates/nav";

const imageLoader = ({ src, width }: { src: any; width: any }) => {
  return `${process.env.apiDomain}/file/${src}`;
};

const Types: InferGetServerSidePropsType<typeof getServerSideProps> = (props: any) => {
  const t = useTranslations("Menu");
  console.log(props.data);
  return (
    <>
      <Head title={t(`d${props.title}`)}></Head>
      <Nav />
      <PageHeader
        title={t(`d${props.title}`)}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image-1536x306.jpg"
      />
      <article className="page-body container page type-page status-publish hentry" id="page-body">
        <div className="row">
          <main className="page-content col-md-9 col-md-push-3">
            <section className="flexible-image-cards">
              <div className="container">
                <div className="flexible-image-cards-header"></div>
                <div className="flexible-image-cards-listing">
                  <div className="row js-equal-heights">
                    {props.data && props.data.length > 0 ? (
                      props.data.map((item: any, index: any) => (
                        <div key={index} className="col-sm-4">
                          <div className="image-cards-box">
                            <Link href={props.basePath + "/" + item.id}>
                              <div className="card-image">
                                {item.img_path ? (
                                  <Image
                                    priority
                                    loader={imageLoader}
                                    src={`${process.env.apiDomain}/file/${item.img_path}`}
                                    alt={item.name}
                                    width={600}
                                    height={500}
                                    className="img-responsive entered lazyloaded"
                                  />
                                ) : (
                                  <Image
                                    priority
                                    src="/empty-image.jpg"
                                    alt="No image available"
                                    width={600}
                                    height={500}
                                    className="img-responsive entered lazyloaded"
                                  />
                                )}
                              </div>
                              <div className="image-card-content js-equal-heights-item h-[98px]">
                                <div className="image-card-btn">
                                  <span className="image-card-btn-text">{t("learnmore")}</span>
                                  <div className="image-card-btn-clippy">
                                    <span className="icon-right"></span>
                                  </div>
                                </div>
                                <h3>{item.name}</h3>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-sm-12">
                        <p className="text-center"></p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Beside menu={HeaderData} title={t(`d${props.title}`)} translate="Menu" />
        </div>
      </article>
      <Footer />
    </>
  );
};

export default Types;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context?.params?.types;
  const instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
  let config = {
    method: "get",
    rejectUnauthorized: false,
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/store/categories?type=${params?.toString().toUpperCase()}`,
    headers: {},
  };
  const categories = await instance.request(config);

  return {
    props: {
      title: params,
      basePath: `/equipment/${params}`,
      data: categories?.data,
      messages: (await import(`../../../../messages/${context.locale}.json`)).default,
    },
  };
};
