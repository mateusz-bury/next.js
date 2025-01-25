import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    outputFileTracingRoot: __dirname,
    poweredByHeader: false,
    reactStrictMode: true,
};

export default nextConfig;
