import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import Head from "@/modules/common/components/head";
import { toast } from "react-toastify";
import LoadingSection from "@/modules/layout/components/LoadingSection";
import { useHomeStore } from "../lib/util/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import Footer from "@/modules/layout/templates/footer";
import Nav from "@/modules/layout/templates/nav";

const QuickSearch = dynamic(() => import("@/modules/home/components/quick-search"));
const Specials = dynamic(() => import("@/modules/home/components/specials"));
const About = dynamic(() => import("@/modules/home/components/about"));
const Cta = dynamic(() => import("@/modules/home/components/cta"));
const HomeCarouselComponent = dynamic(() => import("@/modules/layout/components/HomeCarousel"));
const OfferCarousel = dynamic(() => import("@/modules/layout/components/offer-carousel"));
const TestiCarousel = dynamic(() => import("@/modules/layout/components/testimonials-carousel"));

const Index = () => {
  const {
    loading,
    mastheads,
    deals,
    model,
    location,
    owner,
    testimonials,
    setLoadingState,
    fetchMastHeadData,
    fetchDealData,
    fetchLocationData,
    fetchModelData,
    fetchOwnerData,
    fetchTestimonialsData,
  } = useHomeStore();

  const { locale } = useRouter();
  const t = useTranslations("Index");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingState(true);
        await Promise.all([
          fetchMastHeadData(),
          fetchDealData(),
          fetchLocationData(),
          fetchModelData(),
          fetchOwnerData(),
          fetchTestimonialsData(),
        ]);
      } catch (error) {
        console.error(error); // Log the error for debugging
        toast.error("API Error");
      } finally {
        setLoadingState(false);
      }
    };

    fetchData();
  }, [fetchMastHeadData, setLoadingState]);

  if (loading) return <LoadingSection />;

  return (
    <>
      <Head title={t("title").toString()} />
      <Nav />
      <HomeCarouselComponent slides={mastheads.data} />
      <QuickSearch model={model.data} owner={owner.data} location={location.data} />
      <OfferCarousel deals={deals.data} locale={locale} />
      <Specials />
      <About />
      <TestiCarousel testi={testimonials.data} locale={locale} />
      <Cta />
      <Footer />
    </>
  );
};

export default Index;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
