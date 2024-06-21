const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/dict", {
            target: "http://localhost:8080",
            changeOrigin: true,
        })
    );
};