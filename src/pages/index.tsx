import { GetStaticPropsContext, InferGetServerSidePropsType } from 'next';
import { useTranslations } from 'next-intl';
import QuickSearch from '@/modules/home/components/quick-search';
import Specials from '@/modules/home/components/specials';
import About from '@/modules/home/components/about';
import Cta from '@/modules/home/components/cta';
import Head from '@/modules/common/components/head';

import axios, { AxiosInstance } from 'axios';
import https from 'https';
import OfferCarousel from '@/modules/layout/components/offer-carousel';
import Carousel from '@/modules/layout/components/carousel';
import TestiCarousel from '@/modules/layout/components/testimonials-carousel';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const createRequest = (url: string) => ({
  method: 'get',
  maxBodyLength: Infinity,
  url,
  headers: {},
});

const fetchData = async (instance: AxiosInstance, config: { method?: string; maxBodyLength?: number; url: any; headers?: {}; }) => {
  try {
    const response = await instance.request(config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${config.url}:`, error);
    return null;
  }
};

export async function getServerSideProps({ locale }: GetStaticPropsContext) {
  const instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  const apiDomain = process.env.apiDomain;
  const requests = [
    createRequest(`${apiDomain}/deals`),
    createRequest(`${apiDomain}/mastheads`),
    createRequest(`${apiDomain}/store/attribute-values?attribute_id=clx2rlgzv0005w3hvkqzb1fyo`),
    createRequest(`${apiDomain}/store/attribute-values?attribute_id=clx2rl7l30004w3hv38mtjjbq`),
    createRequest(`${apiDomain}/store/attribute-values?attribute_id=clx2rkyy60003w3hvmr8tg2e5`),
    createRequest(`${apiDomain}/testimonials`),
  ];

  const [deals, hero, model, owner, location, testi] = await Promise.all(
    requests.map((config) => fetchData(instance, config))
  );

  return {
    props: {
      deals,
      hero,
      model,
      owner,
      location,
      testi,
      locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}

export default function Index({
  deals,
  hero,
  model,
  owner,
  location,
  locale,
  testi,
  messages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const t = useTranslations('Index');

  return (
    <>
      <Head title={t('title').toString()} />
      {hero ? <Carousel hero={hero} /> : <Skeleton height={300} />}
      {model && owner && location ? (
        <QuickSearch model={model} owner={owner} location={location} />
      ) : (
        <Skeleton height={200} />
      )}
      {deals ? <OfferCarousel deals={deals} locale={locale} /> : <Skeleton height={400} />}
      <Specials />
      <About />
      {testi ? <TestiCarousel testi={testi} locale={locale} /> : <Skeleton height={200} />}
      <Cta />
    </>
  );
}
