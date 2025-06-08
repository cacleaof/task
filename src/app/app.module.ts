import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjComponent } from './proj/proj.component';
import { TaskComponent } from './task/task.component';
import { ProjFormComponent } from './proj-form/proj-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjComponent,
    TaskComponent,
    ProjFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
