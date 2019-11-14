import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
    // canActivate:[AuthGuard]},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'reset-pwd', loadChildren: './reset-pwd/reset-pwd.module#ResetPwdPageModule' },
  { path: 'view-profile', loadChildren: './view-profile/view-profile.module#ViewProfilePageModule' },
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
