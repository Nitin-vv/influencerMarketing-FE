import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [];

const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'user-profile',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'user-profile',
        loadChildren: () => import('./views/profile/profile.module').then(x => x.ProfileModule),
        data: { title: '' },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
