const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    qualities: [75, 100],
  },

  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
};

export default nextConfig;
