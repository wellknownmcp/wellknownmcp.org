/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false, // important pour éviter les 404 avec / à la fin
 async redirects() {
    return [
      // Redirection slash final -> sans slash
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/.well-known/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: '*' },
        ],
      },
    ]
  },

  async rewrites() {
    return [
      // Exemple de proxy ou de simplification si tu en as besoin plus tard
      {
        source: '/llmfeedhub/spec/:slug',
        destination: '/llmfeedhub/spec/[slug]', // correspond à ton routeur
      },
      {
        source: '/preview/:slug',
        destination: '/preview/[slug]',
      },
    ]
  },
}

module.exports = nextConfig