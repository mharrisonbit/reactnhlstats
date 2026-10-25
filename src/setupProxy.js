const { createProxyMiddleware } = require('http-proxy-middleware');

const targets = {
  '/proxy/basic': 'https://api.nhle.com',
  '/proxy/stats': 'https://api-web.nhle.com',
  '/proxy/scores': 'https://nhl-score-api.herokuapp.com',
};

module.exports = function (app) {
  Object.entries(targets).forEach(([prefix, target]) => {
    app.use(
      prefix,
      createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: { [`^${prefix}`]: '' },
        // Keep redirects (e.g. /now -> /2026-10-25) on the proxy so the browser doesn't hit the blocked origin.
        onProxyRes: (proxyRes) => {
          const location = proxyRes.headers.location;
          if (location && location.startsWith(target)) {
            proxyRes.headers.location = prefix + location.slice(target.length);
          }
        },
      }),
    );
  });
};
