/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in the app
        source: "/(.*)",
        headers: [
          // Enforce HTTPS and enable HSTS preload (only effective over HTTPS)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;",
              "style-src 'self' 'unsafe-inline' https:;",
              "img-src 'self' data: blob: https:;",
              "font-src 'self' data: https:;",
              "connect-src 'self' https:;",
              "frame-ancestors 'self';",
              "form-action 'self';",
              "base-uri 'self'",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;


