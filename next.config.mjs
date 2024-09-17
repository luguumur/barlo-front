/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ['en', 'mn'],
    defaultLocale: 'mn',
    localeDetection: false,
  },
  images: { 
    domains: [
      'webapi.barloworld.mn', 'localhost'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webapi.barloworld.mn',
        port: '',
        pathname: '/file/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images/**'
      },
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
