const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    optimization: {
        runtimeChunk: false // only needed to bypass a temporary bug
    },
    plugins: [
        new ModuleFederationPlugin({
            remotes: {}, // <- !!!
            shared: {
                "@angular/core": {singleton: true, strictVersion: true},
                "@angular/common": {singleton: true, strictVersion: true},
                "@angular/router": {singleton: true, strictVersion: true}
            }
        })
    ]
};
