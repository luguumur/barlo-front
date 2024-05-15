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
  console.log(deals.data)

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
    url: `${process.env.apiDomain}/store/attribute-values?attribute_id=clvng1q8t00006vk64asepsji`,
    headers: { }
  };

  const model = await instance.request(modelConfig)

  let ownerConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/store/attribute-values?attribute_id=clvng1v3k00016vk6acetabj5`,
    headers: { }
  };

  const owner = await instance.request(ownerConfig)

  let locationConfig = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.apiDomain}/store/attribute-values?attribute_id=clvng2eqz00036vk692y2nug2`,
    headers: { }
  };

  const location = await instance.request(locationConfig)

  return {
    props: {
      deals: deals?.data,
      hero: hero?.data,
      model: model?.data,
      owner: owner?.data,
      location: location?.data,
      locale: locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
    }
  };
}


export default function Index({
  deals,
  hero,model,owner,location,locale,
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
      <Testimonials />
      <Cta />
    </>
  );
}