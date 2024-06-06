import { GetStaticPropsContext, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {useTranslations} from 'next-intl';
import PageLayout from './components/PageLayout';
import QuickSearch from '@/modules/home/components/quick-search';
import Specials from '@/modules/home/components/specials';
import About from '@/modules/home/components/about';
import Testimonials from '@/modules/home/components/testimonials';
import Cta from '@/modules/home/components/cta';
import Head from '@/modules/common/components/head';
 
import axios from 'axios';
import https from "https";
import OfferCarousel from '@/modules/layout/components/offer-carousel';
import Carousel from '@/modules/layout/components/carousel';
import TestiCarousel from '@/modules/layout/components/testimonials-carousel';

export async function getServerSideProps({ locale }: GetStaticPropsContext) {

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

  let heroconfig = {
    method: 'get',
    maxBodyLength: Infinity,
    rejectUnauthorized: false,
    url: `${process.env.apiDomain}/mastheads`,
    headers: { }
  };

  const hero = await instance.request(heroconfig)
  let modelConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/store/attribute-values?attribute_id=clx2rlgzv0005w3hvkqzb1fyo`,
    headers: { }
  };

  const model = await instance.request(modelConfig)

  let ownerConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/store/attribute-values?attribute_id=clx2rl7l30004w3hv38mtjjbq`,
    headers: { }
  };

  const owner = await instance.request(ownerConfig)

  let locationConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/store/attribute-values?attribute_id=clx2rkyy60003w3hvmr8tg2e5`,
    headers: { }
  };

  const location = await instance.request(locationConfig)

  let testiConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/testimonials`,
    headers: { }
  };

  const testi = await instance.request(testiConfig)
  return {
    props: {
      deals: deals?.data,
      hero: hero?.data,
      model: model?.data,
      owner: owner?.data,
      location: location?.data,
      testi: testi?.data,
      locale: locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
    }
  };
}


export default function Index({
  deals,
  hero,model,owner,location,locale,testi,
  messages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const t = useTranslations('Index');

  return (
    <>
      <Head title={t("title").toString()}></Head>
      <Carousel hero={hero} />
      <QuickSearch model={model} owner={owner} location={location} />
      <OfferCarousel deals={deals} locale={locale}/>
      <Specials />
      <About />
      <TestiCarousel testi={testi} locale={locale}/>
      <Cta />
    </>
  );
}