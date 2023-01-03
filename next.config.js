require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    DREAMSTUDIO_KEY: process.env.DREAMSTUDIO_KEY,
    SD_API_KEY: process.env.SD_API_KEY,
  },
};

module.exports = nextConfig;
