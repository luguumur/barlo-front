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

axios.defaults.httpAgent = new https.Agent({
  rejectUnauthorized: false,
})
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