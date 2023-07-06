import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { ProfileRoutes } from './profile.routing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { SearchProfileComponent } from './search-profile/search-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent,
    SearchProfileComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedModule,
    RouterModule.forChild(ProfileRoutes),
  ]
})
export class ProfileModule { }
