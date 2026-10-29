import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  devIndicators: false,
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
};
export default nextConfig;
