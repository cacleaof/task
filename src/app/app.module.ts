import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjComponent } from './proj/proj.component';
import { TaskComponent } from './task/task.component';
import { ProjFormComponent } from './proj-form/proj-form.component';
import { DespesaComponent } from './despesa/despesa.component';
import { NTaskComponent } from './n-task/n-task.component';
import { NRegComponent } from './n-reg/n-reg.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { EditRegComponent } from './edit-reg/edit-reg.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjComponent,
    TaskComponent,
    ProjFormComponent,
    DespesaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NTaskComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    EditRegComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
