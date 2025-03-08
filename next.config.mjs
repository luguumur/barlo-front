/** @type {import('next').NextConfig} */
import CompressionPlugin from "compression-webpack-plugin";

const nextConfig = {
  compress: true,
  productionBrowserSourceMaps: true,
  reactStrictMode: false,
  i18n: {
    locales: ["en", "mn"],
    defaultLocale: "mn",
    localeDetection: false,
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self';",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;",
            "style-src 'self' 'unsafe-inline';",
            "img-src 'self' data: https: http:;",
            "connect-src 'self' https://webapi.barloworld.mn;",
            "font-src 'self' https://fonts.gstatic.com;",
            "frame-src 'self' https://www.google.com/ https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;", // Updated this line
          ].join(" "),
        },
      ],
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "webapi.barloworld.mn",
        port: "",
        pathname: "/file/**",
      },
      {
        protocol: "https",
        hostname: "d3leeb4r1qy96s.cloudfront.net",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "www.barloworld.mn",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    apiDomain: "https://webapi.barloworld.mn",
    apikey: "woLpyQc02j4uUtLJj8OIy4oHXCTKnsQT6PklmPOj",
    capchakey: "6LcY_fwpAAAAAG_ZfRJurEfGYEjS4WgwwuEFvRXq",
    googleAnalyticsId: "G-6Q1HFNCHC5",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new CompressionPlugin());
    }
    return config;
  },
};

export default nextConfig;
