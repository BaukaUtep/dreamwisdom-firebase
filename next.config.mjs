/**
 * Next.js config for static export on Firebase Hosting.
 * i18n ведём вручную через /en, /ru, /kk (без built-in i18n).
 */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
