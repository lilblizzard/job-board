// svoif CORS issues and allows hitting endpoints like
// /api/posts rather than /localhost:3000/api/posts

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};
