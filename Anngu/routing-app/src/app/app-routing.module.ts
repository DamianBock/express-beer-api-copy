import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Start } from './start/start.component';
import { Haus_Detail } from './haus-detail/haus-detail.component';


const routes: Routes = [
  { path: '', component: Start },
  { path: 'haus/:id', component: Haus_Detail },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
