import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { NextIntlClientProvider, IntlErrorCode } from 'next-intl';

import Script from "next/script";
import "../styles/globals.css"
import '../styles/icons.css';
import '../styles/main.css';
import PageLayout from './components/PageLayout';
import NProgress from 'nprogress';
import '../styles/nprogress-custom.css';
import { Router } from 'next/router';
import { useEffect } from 'react';
import 'selectric';
// import 'magnific-popup/dist/magnific-popup.css';
// import 'jquery-selectric/public/selectric.css';

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

declare global {
  interface Window {
    $: typeof import('jquery'); // This will declare a global $ variable as jQuery
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const timeZone = 'Asia/Ulaanbaatar';

  useEffect(() => {
    // Load jQuery globally
    if (typeof window !== 'undefined') {
      window.$ = require('jquery');
    }
  }, []);

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone={timeZone}
    >
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </NextIntlClientProvider>
  );
}