import { Route } from '@angular/router';

export const routes: Route[] = [
    {
        path: 'login-example',
        loadComponent: () => import('./examples/login-example/login-example.component'),
    },
    { path: '**', redirectTo: 'login-example' },
];
