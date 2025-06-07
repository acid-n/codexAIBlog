/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Font optimization causes issues in CI without network
  optimizeFonts: false,
};

module.exports = nextConfig;
