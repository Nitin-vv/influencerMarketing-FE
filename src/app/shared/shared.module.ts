import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    FlexLayoutModule,
    //  NgxLoadingModule.forRoot({
    //   animationType: ngxLoadingAnimationTypes.wanderingCubes,
    //   backdropBackgroundColour: "rgba(0,0,0,0.1)",
    //   backdropBorderRadius: "4px",
    //   primaryColour: "#ffffff",
    //   secondaryColour: "#ffffff",
    //   tertiaryColour: "#ffffff",
    //  }),
  ],
  providers: [],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    FlexLayoutModule,
    // NgxLoadingModule,
  ],
})
export class SharedModule {}
