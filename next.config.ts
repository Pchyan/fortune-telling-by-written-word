import type {NextConfig} from 'next';

// Read base path from environment variable
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  // output: 'export', // 已移除，改用預設 SSR/Serverless
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
