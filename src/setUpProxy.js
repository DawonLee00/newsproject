const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api',{
       target: "https://openapi.naver.com",
      changeOrigin: true,
      pathRewrite:{
        '^/api/':'/'
      }
    })
  );

  app.use(
    createProxyMiddleware("/app/v1",{
       target: "https://localhost:8080",
      changeOrigin: true,
    })
  );
};