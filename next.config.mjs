/** @type {import('next').NextConfig} */
const nextConfig = {
  // Solo usamos páginas TS/TSX
  pageExtensions: ['ts', 'tsx'],
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};

export default nextConfig;