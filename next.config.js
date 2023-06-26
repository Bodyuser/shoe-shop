/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	reactStrictMode: false,
	env: {
		APP_URL: process.env.NEXT_APP_URL,
		APP_ENV: process.env.NEXT_APP_ENV,
		APP_SERVER_URL: process.env.NEXT_APP_SERVER_URL,
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.NEXT_APP_SERVER_URL}/uploads/:path*`,
			},
		]
	},
}

module.exports = nextConfig
