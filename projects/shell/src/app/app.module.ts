import {NgModule} from '@angular/core';
import {AppComponent} from "./components/app.component";
import {HeaderComponent} from "./components/header/header.component";
import {NavComponent} from "./components/nav/nav.component";
import {OutletComponent} from "./components/outlet/outlet.component";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {HomeModule} from "./modules/home/home.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    OutletComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', loadChildren: () => HomeModule},
      {path: 'local', loadChildren: () => import('./modules/local/local.module').then(m => m.LocalModule)},
      {path: '**', redirectTo: ''}
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
