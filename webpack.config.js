const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const ProductModuleFederationConfigPlugin = withModuleFederationPlugin({

  name: 'products',

  exposes: {
    './ProductsModule': './src/app/products/products.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});

ProductModuleFederationConfigPlugin.output.publicPath = 'http://localhost:4201/'
module.exports = ProductModuleFederationConfigPlugin;
