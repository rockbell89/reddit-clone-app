/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "www.gravatar.com",
      "localhost",
      "ec2-54-180-31-7.ap-northeast-2.compute.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
