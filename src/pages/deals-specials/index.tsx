import PageHeader from "@modules/layout/components/page-header";
import { GetServerSideProps, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import axios from "axios";
import https from "https";
import Questions from "@/modules/layout/components/questions";
import { useRouter } from "next/router";
import Head from "@/modules/common/components/head";
import { useHomeStore } from "../../lib/util/store";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "react-toastify";
import LoadingSection from "@/modules/layout/components/LoadingSection";
import Footer from "@/modules/layout/templates/footer";
import Nav from "@/modules/layout/templates/nav";

const DealsPage = () => {
  const { loading, deals, fetchDealData, setLoadingState } = useHomeStore();
  const { locale } = useRouter();
  const t = useTranslations("Deals");
  const menu = useTranslations("Menu");

  useEffect(() => {
    (async () => {
      try {
        setLoadingState(true);
        await fetchDealData();
        setLoadingState(false);
      } catch (error: unknown) {
        toast.error("API Error");
      } finally {
        setLoadingState(false);
      }
    })();
  }, [fetchDealData, setLoadingState]);
  if (loading) return <LoadingSection />;
  return (
    <>
      <Head title={t("deals_specials")}></Head>
      <Nav />
      <PageHeader
        title={t("deals_specials")}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image-1536x306.jpg"
      />
      <article
        className="page-body container post-97908 deals_specials type-deals_specials status-publish has-post-thumbnail hentry"
        id="page-body"
      >
        <div className="row">
          <main className="page-content col-md-9 col-md-push-3 specials-deals">
            <div className="row">
              {deals.data?.map((item: any, index: any) => (
                <div key={index} className="col-sm-6 box-deals">
                  <a href={`/deals-specials/${item.id}`} className="deal">
                    <h2 className="post__title"> {locale === "mn" ? item.title : item.title_en} </h2>
                    <img
                      width="2088"
                      height="1046"
                      src={"https://webapi.barloworld.mn/file/" + item.img_path}
                      className="alignleft img-responsive wp-post-image"
                      alt="Barloworld Mongolia"
                      decoding="async"
                      sizes="(max-width: 300px) 100vw, 300px"
                    />
                    <button className="btn btn-primary button--block"> {menu("learnmore")} </button>
                  </a>
                </div>
              ))}
            </div>
          </main>
          <aside className="page-sidebar  col-md-3 col-md-pull-9">
            <Questions />
          </aside>
        </div>
      </article>
      <Footer />
    </>
  );
};

export default DealsPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
