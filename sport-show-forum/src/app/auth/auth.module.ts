import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
