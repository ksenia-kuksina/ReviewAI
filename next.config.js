/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images-na.ssl-images-amazon.com', 'm.media-amazon.com', 'ae01.alicdn.com', 'i.ebayimg.com'],
  },
}

module.exports = nextConfig 