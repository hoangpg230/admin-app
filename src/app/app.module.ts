import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';


//services
import { AuthenticationService } from './../app/core/services/authentication.service';
import { NotificationService } from './../app/core/services/notification.service';
import { UtilityService } from './../app/core/services/utility.service';

//guards
import { AuthGuard } from './core/guards/auth.guard';
import { RolesGuard } from './core/guards/roles.guard';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [
    AuthenticationService, 
    NotificationService, 
    UtilityService,
    AuthGuard,
    RolesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
