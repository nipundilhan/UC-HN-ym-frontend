import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './global_comman/home/home.component';
import { LoginComponent } from './global_comman/login/login.component';
import { TestComponent } from './global_comman/test/test.component';
import { SignupComponent } from './global_comman/signup/signup.component';
import { SelectavatarComponent } from './global_comman/selectavatar/selectavatar.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'select-avatar', component: SelectavatarComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
