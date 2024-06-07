import {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import {NextIntlClientProvider, IntlErrorCode} from 'next-intl';
import Providers from '@/providers';

import axios from "axios";
import https from "https";

import Script from "next/script";
import "../styles/globals.css"
import '../styles/icons.css';
import '../styles/main.css';
import PageLayout from './components/PageLayout';
import NProgress from 'nprogress';
import '../styles/nprogress-custom.css';
import { Router } from 'next/router';

axios.defaults.httpAgent = new https.Agent({
  rejectUnauthorized: false,
})

Router.events.on('routeChangeStart', (url, { shallow }) => {
  if (!shallow) {
    NProgress.start();
  }
});

Router.events.on('routeChangeComplete', (url, { shallow }) => {
  if (!shallow) {
    NProgress.done();
  }
});

Router.events.on('routeChangeError', (url, { shallow }) => {
  if (!shallow) {
    NProgress.done();
  }
});
export default function App({Component, pageProps}: AppProps) {
  const router = useRouter();
  const timeZone = 'Asia/Ulaanbaatar';
  
  return (
    <>
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
        timeZone={timeZone}
      >
        <Providers>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </Providers>
      </NextIntlClientProvider>

      <Script src="/js/jquery.js" strategy="beforeInteractive"/>
      <Script src="/js/jquery.selectric.js" strategy="beforeInteractive"/>
      <Script src="/js/main.js"/>
    </>
  );
}