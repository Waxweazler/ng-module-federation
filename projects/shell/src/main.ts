import {loadRemoteEntry} from '@angular-architects/module-federation';

Promise.all([
  loadRemoteEntry('http://localhost:3000/remoteEntry.js', 'mfe')
]).then(() => import('./bootstrap'));
