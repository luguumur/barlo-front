import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import { useEffect } from "react";
import NProgress from "nprogress";
import { ToastContainer } from "react-toastify";

import GoogleCaptchaWrapper from "./googleCaptchaWrapper";

import "../styles/globals.css";
import "../styles/icons.css";
import "../styles/main.css";
import "../styles/nprogress-custom.css";

import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const timeZone = "Asia/Ulaanbaatar";

  useEffect(() => {
    const handleRouteChangeStart = () => NProgress.start();
    const handleRouteChangeComplete = () => NProgress.done();
    const handleRouteChangeError = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router.events]);

  return (
    <NextIntlClientProvider locale={router.locale || "mn"} messages={pageProps.messages} timeZone={timeZone}>
      <GoogleCaptchaWrapper>
        <Component {...pageProps} />
      </GoogleCaptchaWrapper>
      <ToastContainer position="top-right" autoClose={3000} className="font-light text-[13px]" />
    </NextIntlClientProvider>
  );
}
