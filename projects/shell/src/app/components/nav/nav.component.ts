import {Component} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  modules = [
    { path: '', label: 'Home' },
    { path: 'local', label: 'Lazy Local' },
    { path: 'remote', label: 'Lazy Remote' }
  ]

}
