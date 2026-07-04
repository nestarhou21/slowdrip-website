/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Product photos uploaded from the POS admin live in Supabase storage
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lfarxgpcsnyadyyxxbqe.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
