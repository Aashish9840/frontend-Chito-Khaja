/** @type {import('next').NextConfig} */
const api_url = process.env.NEXT_CONFIG_API;
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${api_url}/api/:path*`,
      },
    ];
  },
  images: {
    domains: ["localhost", "https://backend-chito-khaja.onrender.com"],
  },
};

export default nextConfig;
