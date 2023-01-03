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
  },
};

module.exports = nextConfig;
