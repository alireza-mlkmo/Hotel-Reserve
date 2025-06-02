/** @type {impo
 * rt('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cjjblomvvijynrktyksu.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
        search: "",
      },
    ],
  },
  // output: "export",
  eslint:{
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
