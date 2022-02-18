// @ts-check

const path = require("path");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  // swcMinify: true,
  // compiler: {
  //   removeConsole: {
  //     exclude: ["error"],
  //   },
  // },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["lh3.googleusercontent.com", "cdn.sanity.io"],
  },
};

module.exports = nextConfig;
