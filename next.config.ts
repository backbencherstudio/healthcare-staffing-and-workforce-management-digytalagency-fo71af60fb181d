import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      // Add more if needed
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains
      }
    ],
    // Optional: Add these for better control
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  // Optional: Add trailing slash if needed
  trailingSlash: false,
};

export default nextConfig;