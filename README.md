# ng-module-federation

This is an example on how to integrate the feature **Module Federation** of Webpack v5 into an Angular Browser App v11.
It includes two Angular projects, one [Micro Frontend](projects/mfe) and one [Shell](projects/shell) which lazy loads
and displays a module from the Micro Frontend. 

## Things (mostly for me) to remember

1. The installation has to be done via **yarn**. yarn can be installed via npm:
    ```
    npm install yarn -g
    ```
    This is because Angular CLI v11 uses Webpack v4, but we need v5.
    This can be achieved by putting this snippet into [package.json](package.json):
    ```json
    "resolutions": {
        "webpack": "^5.0.0"
    }
    ```

2. The build has to be done via [npx-build-plus](https://github.com/manfredsteyer/ngx-build-plus). This is because
we need to provide an enhanced configuration for Webpack. Look up these parts inside [angular.json](angular.json):
    ```json
    "build": {
     "builder": "ngx-build-plus:browser",
     "options": {
       [...]
       "extraWebpackConfig": "projects/mfe/webpack.config.js"
     }
    ```

3. Both projects need to enhance the Webpack Configuration. See [Webpack Configuration MFE](projects/mfe/webpack.config.js) and
[Webpack Configuration Shell](projects/shell/webpack.config.js). The MFE exposes one module to be loaded remotely, and the Shell
consumes it. Furthermore, the Angular library is shared between the two applications to prevent loading libraries multiple times.  

4. The heart and soul is provided by the dependency
[@angular-architects/module-federation](https://github.com/angular-architects/module-federation-plugin). In the beginning
it loads the remote entry before bootstrapping the Shell, see [main.ts](projects/shell/src/main.ts):
    ```typescript
    Promise.all([
       loadRemoteEntry('http://localhost:3000/remoteEntry.js', 'mfe')
    ]).then(() => import('./bootstrap'));
    ```
   Then, when the user navigates to the part of the Shell where the MFE is needed,
   it (lazy) loads the remote module, see [app.module.ts](projects/shell/src/app/app.module.ts):
   ```typescript
    {
       path: 'remote',
       loadChildren: () =>
           loadRemoteModule({
               remoteName: 'mfe',
               exposedModule: './local'
           }).then(m => m.LocalModule)
    }
   ```
