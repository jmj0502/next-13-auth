
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
    },
    images: {
        domains: [
            'robohash.org'
        ]
    } 
}

module.exports = nextConfig
