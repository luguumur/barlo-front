/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ['en', 'mn'],
    defaultLocale: 'mn'
  },
  images: { 
    domains: [
      'webapi.barloworld.mn',
      'localhost',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webapi.barloworld.mn',
        port: '',
        pathname: '/file/**',
      },
    ],
  },
  env: {
    apiDomain: 'https://webapi.barloworld.mn',
  },
};

export default nextConfig;
