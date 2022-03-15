// @ts-check

const path = require("path");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  swcMinify: true,
  // compiler: {
  //   removeConsole: true,
  // },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    loader: "default",
    domains: [
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com",
      "cdn.sanity.io",
    ],
  },
};

module.exports = nextConfig;
