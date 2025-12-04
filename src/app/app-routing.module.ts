import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddcarComponent } from './addcar/addcar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';



const routes: Routes = [

{path:'',redirectTo:"login",pathMatch:"full"},  
//{ path: 'default',component: DefaultComponent},
{path:'login',component:LoginComponent},
{path:'home',component:HomeComponent},
{path:'registration',component:RegistrationComponent},
{path:'imageupload',component:ImageuploadComponent},
{path:'notification',component:NotificationsComponent},
{path:'addcar',component:AddcarComponent},
{path:'user-profile',component:UserProfileComponent},
{path:'upgrade/:carId',component:UpgradeComponent},
{path:'table-list',component:TableListComponent},
{path:'typography/:carId',component:TypographyComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
