const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.firebaseapp.com',
      },
      {
        protocol: 'https',
        hostname: '**.firebasestorage.app',
      },
    ],
  },
};

module.exports = nextConfig;