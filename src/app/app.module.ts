import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ HttpClientModule } from '@angular/common/http'
import { HomeComponent } from './home/home.component';
import { AddcarComponent } from './addcar/addcar.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { IconsComponent } from './icons/icons.component';

import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import{ BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileComponent } from './user-profile/user-profile.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    AddcarComponent,
    ImageuploadComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    TableListComponent,
    TypographyComponent,
    UpgradeComponent,
    UserProfileComponent,
    //DefaultComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    MatButtonModule,
    //DefaultModule
    
  ],
 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
