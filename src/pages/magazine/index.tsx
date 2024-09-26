import PageHeader from "@modules/layout/components/page-header";
import { teamData } from "@data/teamData";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";
import { Magazines } from "@/data/magazine";
import Head from "@/modules/common/components/head";
import { useHomeStore } from "@/lib/util/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import LoadingSection from "@/modules/layout/components/LoadingSection";

const Management = () => {
  const { loading, magazine, fetchMagazineData, setLoadingState } = useHomeStore();
  const t = useTranslations("Home");
  useEffect(() => {
    (async () => {
      try {
        setLoadingState(true);
        await fetchMagazineData();
        setLoadingState(false);
      } catch (error: unknown) {
        toast.error("API Error");
      } finally {
        setLoadingState(false);
      }
    })();
  }, [fetchMagazineData, setLoadingState]);
  if (loading) return <LoadingSection />;
  return (
    <>
      <Head title={t(`magazine`)}></Head>
      <PageHeader
        title={t(`magazine`)}
        image="https://d3leeb4r1qy96s.cloudfront.net/assets/img/cta-banner-image-1536x306.jpg"
      />
      <section className="services-card-section">
        <div className="container">
          <div className="services-card-wrapper desktop">
            {magazine.data?.map((item: any, index: number) => (
              <a key={index} className="hover:bg-white rounded mb-5 pb-2" href={item.url} target="blank_">
                <div className="px-5 max-w-[255px]">
                  <span className="text-[22px] text-[#ffcc03]">{item.title}</span>
                  <img
                    className="content-center services-card-img-icon"
                    src={`https://d3leeb4r1qy96s.cloudfront.net/${item.image}`}
                    alt={item.title}
                  />
                  <span className="services-card-title text-right text-gray-500 text-[15px]">{item.date}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Management;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
