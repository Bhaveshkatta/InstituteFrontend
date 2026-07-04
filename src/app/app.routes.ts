import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { 
        path: 'login', 
        loadComponent: () => import('./features/public/auth/login/login').then(m => m.Login) 
    },
    { 
        path: 'signup', 
        loadComponent: () => import('./features/public/auth/signup/signup').then(m => m.SignUp) 
    },
    { 
        path: 'forgot-password', 
        loadComponent: () => import('./features/public/auth/forgot-password/forgot-password').then(m => m.ForgotPassword) 
    }
];


