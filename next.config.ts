/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.mollie.com/v2/:path*', // Proxy to Mollie's API
      },
    ];
  },
};

module.exports = nextConfig;