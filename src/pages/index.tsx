import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import QuickSearch from '@/modules/home/components/quick-search';
import Specials from '@/modules/home/components/specials';
import About from '@/modules/home/components/about';
import Cta from '@/modules/home/components/cta';
import Head from '@/modules/common/components/head';

import axios, { AxiosInstance } from 'axios';
import https from 'https';
import OfferCarousel from '@/modules/layout/components/offer-carousel';
import TestiCarousel from '@/modules/layout/components/testimonials-carousel';
import HomeCarouselComponent from '@/modules/layout/components/HomeCarousel';
import { apiMastheads } from '@/services/home/HomeServices';

import { useLocale, useTranslations } from 'next-intl';
import { useHomeStore } from '../lib/util/store';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import LoadingSection from '../modules/layout/components/LoadingSection';
import CarouselComponent from '../modules/layout/components/carousel';
import { useRouter } from 'next/router';
import SkeletonLoader from '@/modules/layout/components/SkeletonLoader';

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
    fetchTestimonialsData
  } = useHomeStore();
  const {locale} = useRouter();
  const t = useTranslations("Index");
  useEffect(() => {
    (async () => {
      try {
        setLoadingState(true);
        await Promise.all([fetchMastHeadData(), fetchDealData(), fetchLocationData(), fetchModelData(), fetchOwnerData(), fetchTestimonialsData()]);
        setLoadingState(false);
      } catch (error: unknown) {
        toast.error("API Error")
      } finally {
        setLoadingState(false);
      }
    })();
  }, [fetchMastHeadData, setLoadingState]);
  if (loading) return <LoadingSection />;
  return (
    <>
      <Head title={t('title').toString()} />
      {/* {loading ? <SkeletonLoader /> : mastheads.data && <HomeCarouselComponent slides={mastheads.data} />} */}
      {loading ? <SkeletonLoader /> : <QuickSearch model={model.data} owner={owner.data} location={location.data} />}
      {/* {loading ? <SkeletonLoader /> : <OfferCarousel deals={deals.data} locale={locale} />} */}
      <Specials />
      {/* <About /> */}
      {loading ? <SkeletonLoader /> : testimonials && <TestiCarousel testi={testimonials.data} locale={locale} />}
      <Cta />
    </>
  )
}

export default Index;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}