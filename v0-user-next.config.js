/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        // Your Turbo rules here
      },
    },
  },
}

module.exports = nextConfig

