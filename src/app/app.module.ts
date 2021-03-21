import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgModule } from '@angular/core';
import { AppRouters } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from './material.module';
import { DataService } from './data.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    AppRouters,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    MaterialModule,
    BrowserAnimationsModule 
  ],
   providers: [DataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
