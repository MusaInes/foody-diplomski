import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './pages/shared/services/auth-guard.service';
import { RoleGuardService as RoleGuard } from "./pages/shared/services/role-guard.service";

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(module => module.DashboardModule), canActivate: [AuthGuard] },
  { path: 'receipts', loadChildren: () => import('./pages/receipts/receipts.module').then(module => module.ReceiptsModule), canActivate: [AuthGuard] },
  { path: 'meals', loadChildren: () => import('./pages/meals/meals.module').then(module => module.MealsModule), canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(module => module.ProfileModule), canActivate: [AuthGuard] },
  { path: 'register', loadChildren: () => import('./pages/profile/register/register.module').then(module => module.RegisterModule) },
  { path: 'login', loadChildren: () => import('./pages/profile/login/login.module').then(module => module.LoginModule) },
  { path: 'admin', loadChildren: () => import('./pages/profile/admin/admin.module').then(module => module.AdminModule), canActivate: [RoleGuard] },
  { path: '**', redirectTo: '' }

  // { path: 'profile', loadChildren: () => import('./main-page/main-page.module').then(module => module.MainPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
