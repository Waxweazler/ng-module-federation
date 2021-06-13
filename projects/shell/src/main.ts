import {loadRemoteEntry} from '@angular-architects/module-federation';

Promise.all([
  loadRemoteEntry('http://localhost:5002/remoteEntry.js', 'mfe')
]).then(() => import('./bootstrap'));
