import NextHead from "next/head";
import Script from "next/script";
import React from "react";
import { siteConfig } from "@/configs/site";
import { Analytics } from "@/components/analytics";

type HeadProps = {
  title?: string;
  description?: string | null;
  image?: string | null;
};

const Head: React.FC<HeadProps> = ({ title, description, image }) => {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle;

  const metaDescription = description || siteConfig.defaultDescription;
  const metaImage = image || siteConfig.defaultImage;

  return (
    <NextHead>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Schema.org Meta Tags */}
      <meta itemProp="name" content={pageTitle} />
      <meta itemProp="description" content={metaDescription} />
      <meta itemProp="image" content={metaImage} />

      {/* Keywords */}
      <meta name="keywords" content={siteConfig.keywords} />

      {/* OpenGraph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={siteConfig.url} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Favicon and Preconnects */}
      <link rel="icon" href={`${siteConfig.baseUrl}/assets/fav.svg`} />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://www.google.com" />

      {/* Analytics */}
      <Analytics />
    </NextHead>
  );
};

export default Head;
