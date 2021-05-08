const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, '../../tsconfig.json'));

module.exports = {
  output: {
    uniqueName: 'mfe'
  },
  optimization: {
    runtimeChunk: false // Only needed to bypass a temporary bug
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './local': './projects/mfe/src/app/modules/local/local.module.ts'
      },
      shared: {
        '@angular/core': {singleton: true, strictVersion: true},
        '@angular/common': {singleton: true, strictVersion: true},
        '@angular/router': {singleton: true, strictVersion: true},
        ...sharedMappings.getDescriptors() // Uncomment for sharing lib of an Angular CLI or Nx workspace
      }
    }),
    sharedMappings.getPlugin() // Uncomment for sharing lib of an Angular CLI or Nx workspace
  ]
};
