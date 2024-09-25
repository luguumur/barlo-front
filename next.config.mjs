/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: false,
  i18n: {
    locales: ['en', 'mn'],
    defaultLocale: 'mn',
    localeDetection: false,
  },
  images: { 
   
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webapi.barloworld.mn',
        port: '',
        pathname: '/file/**',
      },
      {
        protocol: 'https',
        hostname: 'd3leeb4r1qy96s.cloudfront.net',
        port: '',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'www.barloworld.mn',
        port: '',
        pathname: '/**',
      }
    ],
  },
  env: {
    apiDomain: 'https://webapi.barloworld.mn',
    apikey: 'woLpyQc02j4uUtLJj8OIy4oHXCTKnsQT6PklmPOj',
    capchakey: '6LcY_fwpAAAAAG_ZfRJurEfGYEjS4WgwwuEFvRXq',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};


export default nextConfig;
