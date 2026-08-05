import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { 
        path: '', 
        loadComponent: () => import('./features/public/home/home').then(m => m.HomeComponent) 
    },
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
    },
    {
        path: 'government-courses',
        loadComponent: () => import('./features/public/government-courses/public-government-courses').then(m => m.PublicGovernmentCourses)
    },
    {
        path: 'student',
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/student/student-dashboard/student-dashboard').then(m => m.StudentDashboard)
            },
            {
                path: 'courses',
                loadComponent: () => import('./features/student/student-courses/student-courses').then(m => m.StudentCourses)
            },
            {
                path: 'profile',
                loadComponent: () => import('./features/student/student-profile/student-profile').then(m => m.StudentProfile)
            },
            {
                path: 'government-courses',
                loadComponent: () => import('./features/student/student-government-courses/student-government-courses').then(m => m.StudentGovernmentCourses)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
