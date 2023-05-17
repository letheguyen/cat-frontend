/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
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
