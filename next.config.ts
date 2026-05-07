import type { NextConfig } from "next";

// Loader path from orchids-visual-edits - use direct resolve to get the actual file
const loaderPath = require.resolve('orchids-visual-edits/loader.js');

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Transpile only essential Sanity packages for embedded Studio (client-side only)
  transpilePackages: ['@sanity/vision', '@sanity/presentation', 'styled-components'],

  // External packages - don't bundle these in the server bundle
  serverExternalPackages: [
    '@sanity/client',
    '@sanity/image-url',
  ],

  // Modular imports to automatically transform imports for better tree-shaking
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
      skipDefaultConversion: true,
    },
  },

  turbopack: {
    rules: {
      "src/{components,app/!(admin)}/**/*.{jsx,tsx}": {
        loaders: [loaderPath]
      }
    }
  },

  // Improve build caching and performance
  experimental: {
    // Optimize CSS imports
    optimizeCss: true,
    // Use lighter build for faster dev
    webpackBuildWorker: true,
  },

  async redirects() {
    return [
      { source: '/consulting', destination: '/quant-studio', permanent: true },
      { source: '/:locale(it|en)/consulting', destination: '/:locale/quant-studio', permanent: true },
    ];
  },
} as NextConfig;

export default nextConfig;