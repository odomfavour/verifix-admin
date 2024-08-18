/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASEURL: 'https://verifix-backend.onrender.com',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
