const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/DecisionService/rest/MortgageRisk/MortgageRisk',
    createProxyMiddleware({
      target:  "http://192.168.0.42:9090/DecisionService/rest/MortgageRisk/MortgageRisk",
      changeOrigin: true,
    })
  );
  app.use(
    '/DecisionService/rest/Shipment_Pricing_RuleApp/Shipment_Pricing',
    createProxyMiddleware({
      target:  "http://192.168.0.42:9090/DecisionService/rest/Shipment_Pricing_RuleApp/Shipment_Pricing",
      changeOrigin: true,
    })
  );
  app.use(
    '/DecisionService/rest/Capture/ProcessIOCRDocument',
    createProxyMiddleware({
        target:  "http://192.168.0.42:9090/DecisionService/rest/Capture/ProcessIOCRDocument",
        changeOrigin: true,
      })
  );
  app.use(
    '/ocr',
    createProxyMiddleware({
      target:  "http://localhost:8000",
      changeOrigin: false,
    })
  );
};