import { GetStaticPropsContext } from 'next';
import QuickSearch from '@/modules/home/components/quick-search';
import Specials from '@/modules/home/components/specials';
import About from '@/modules/home/components/about';
import Cta from '@/modules/home/components/cta';
import Head from '@/modules/common/components/head';
import { toast } from 'react-toastify';
import LoadingSection from '@/modules/layout/components/LoadingSection';
import SkeletonLoader from '@/modules/layout/components/SkeletonLoader';
import HomeCarouselComponent from '@/modules/layout/components/HomeCarousel';
import OfferCarousel from '@/modules/layout/components/offer-carousel';
import TestiCarousel from '@/modules/layout/components/testimonials-carousel';
import { useHomeStore } from '../lib/util/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

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
      } catch {
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
      <Head title={t('title').toString()} />
      {mastheads.data ? <HomeCarouselComponent slides={mastheads.data} /> : <SkeletonLoader />}
      <QuickSearch model={model.data} owner={owner.data} location={location.data} />
      <OfferCarousel deals={deals.data} locale={locale} />
      <Specials />
      <About />
      {testimonials && <TestiCarousel testi={testimonials.data} locale={locale} />}
      <Cta />
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
