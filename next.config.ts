import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'mi-api.com', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'clientecommerce.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
