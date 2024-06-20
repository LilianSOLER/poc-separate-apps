import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {Lib1PageNotFoundComponent} from "lib1";

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    "path": "**", component: Lib1PageNotFoundComponent
  }
];
