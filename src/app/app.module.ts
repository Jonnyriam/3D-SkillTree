import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BranchComponent } from './branches/branch/branch.component';
import { BranchesComponent } from './branches/branches.component';

@NgModule({
  declarations: [
    AppComponent,
    BranchComponent,
    BranchesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
