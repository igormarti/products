const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const ProductModuleFederationConfigPlugin = withModuleFederationPlugin({

  name: 'products',

  remotes: {
    "products-suggested": "http://localhost:4202/remoteEntry.js",    
  },

  exposes: {
    './ProductsModule': './src/app/products/products.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    // "pubsub-js":{singleton: true, strictVersion: true, requiredVersion: 'auto' }
  },

});

ProductModuleFederationConfigPlugin.output.publicPath = 'http://localhost:4201/'
module.exports = ProductModuleFederationConfigPlugin;
