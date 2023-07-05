/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  experimental: {
    appDir: true,
  },
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : null,
  basePath: process.env.BASE_PATH || '',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: 'asset/resource',
    });

    return config;
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
};

module.exports = nextConfig;
