import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LocalComponent} from "./local.component";

@NgModule({
  declarations: [
    LocalComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: LocalComponent}
    ])
  ]
})
export class LocalModule {
}
