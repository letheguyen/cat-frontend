/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_API_BASE_URL || '/'],
    remotePatterns: [
      {
        hostname: 'localhost',
      },
    ],
  },
}

module.exports = nextConfig
