import NextHead from "next/head";
import Script from "next/script";
import React, { useEffect } from "react";

type HeadProps = {
  title?: string;
  description?: string | null;
  image?: string | null;
};

const Head: React.FC<HeadProps> = ({ title, description, image }) => {
  return (
    <NextHead>
      <title>{`${title} | Barloworld Mongolia`}</title>
      <meta itemProp="name" content={title} />
      {description && <meta itemProp="description" content={description} />}
      {image && <meta itemProp="image" content={image} />}
      <meta
        name="keywords"
        content="Тоног төхөөрөмж, tonog tohooromj, tonog tuhuurumj,Wagner Asia Equipment LLC, Dealer of Caterpillar, Mongolia, Sales , Services, Rental, Barloworld Mongolia LLC, Barloworld, Barloworld Equipment, Backhoe Loader, Skid Steer Loader, Telehandler, Auger, Electric Power, Wheel Dozer, Motor Grader, Track Loader, Reclaimer, Stabilizer, Handler, Excavator, Equipment, Dozer, Loader, Achigch, Achigch, Tractor, Generator, Exca, Exce, Truck, Mining, Mining Tractor, Mining Truck, Барловоролд, Барловорлд Монголиа, Уул уурхай, Уул уурхайн тоног төхөөрөмж, замын тоног төхөөрөмж, барилгын тоног төхөөрөмж, хүнд тоног төхөөрөмж, хүнд машин механизм, ачигч, бага оврын дугуйт ачигч, сунадаг ачигч, трактор, универсал трактор, түнтгэр шар, бобкат, bobcat, cat, komatsu, xcmg, sdlg, автогрейдер, гинжит трактор, генератор"
      />

      <meta name="title" content="Барловорлд Монголиа | Barloworld Mongolia" />
      <meta name="description" content="Barloworld Mongolia LLC is the official dealer of Caterpillar in Mongolia." />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://d3leeb4r1qy96s.cloudfront.net/assets/meta.png" />
      <meta property="og:title" content="Барловорлд Монголиа | Barloworld Mongolia" />
      <meta
        property="og:description"
        content="Barloworld Mongolia LLC is the official dealer of Caterpillar in Mongolia."
      />
      <meta property="og:image" content="https://d3leeb4r1qy96s.cloudfront.net/assets/meta.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://d3leeb4r1qy96s.cloudfront.net/assets/meta.png" />
      <meta property="twitter:title" content="Барловорлд Монголиа | Barloworld Mongolia" />
      <meta
        property="twitter:description"
        content="Barloworld Mongolia LLC is the official dealer of Caterpillar in Mongolia."
      />
      <meta property="twitter:image" content="https://d3leeb4r1qy96s.cloudfront.net/assets/meta.png" />

      <link rel="icon" href="https://d3leeb4r1qy96s.cloudfront.net/assets/fav.svg" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://www.google.com" />
    </NextHead>
  );
};

export default Head;
