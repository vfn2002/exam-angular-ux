import {RouterModule, Routes} from "@angular/router";

import {NgModule} from "@angular/core";
import {CreateComponent} from "./components/landing-page/create/create.component";
import {ListComponent} from "./components/landing-page/list/list.component";

const APP_ROUTES: Routes = [
  { path: '',                           component: CreateComponent             },
  { path: 'create',                     component: CreateComponent             },
  { path: 'list',                       component: ListComponent               },
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES/*, { useHash: true }*/)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
