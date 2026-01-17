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
  
  // Transpile only essential Sanity packages for embedded Studio
  // Reduced from 5 to 3 packages - @sanity/ui will be auto-included by sanity
  transpilePackages: ['sanity', '@sanity/vision', '@sanity/presentation'],
  
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
  
  // External packages for server components (moved from experimental in Next.js 15+)
  serverExternalPackages: ['@sanity/client'],
  
  // Improve build caching
  experimental: {
    // Optimize CSS imports
    optimizeCss: true,
  },
} as NextConfig;

export default nextConfig;