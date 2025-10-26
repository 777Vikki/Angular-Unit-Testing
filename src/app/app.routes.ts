import { Routes } from '@angular/router';
import { Parent } from './parent/parent';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/parent' },
    { path: 'parent', component: Parent }
];
