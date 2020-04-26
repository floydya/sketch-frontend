const path = require("path");
const withLess = require("@zeit/next-less");

const crypto = require('crypto');
module.exports = withLess({
  webpack: (config) => {
    config.resolve.alias["~"] = path.resolve(__dirname);
    return config;
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    getLocalIdent: (context, _, localName) => {
      if (/\.module\.\w+$/i.test(context.resourcePath)) {
        const hash = crypto.createHash('sha256', 'webpack').update(`${context.resourcePath}_${localName}`).digest('hex')
        return `css_${hash}`
      }
      return localName;
    },
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
});
