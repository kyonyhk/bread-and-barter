/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.woff2$/,
        use: {
          loader: 'url-loader',
        },
      });
    }

    return config;
  },
};

export default nextConfig;
