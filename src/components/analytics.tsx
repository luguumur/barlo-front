import Script from "next/script";
import { siteConfig } from "@/configs/site";

export function Analytics() {
  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-6Q1HFNCHC5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6Q1HFNCHC5');
</script>
    </>
  );
}
