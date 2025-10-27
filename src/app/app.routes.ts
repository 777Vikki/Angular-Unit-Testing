import { Routes } from '@angular/router';
import { UserComponent } from './user-component/user-component';

export const routes: Routes = [
    { path: '', redirectTo: '/user', pathMatch: 'full' },
    { path: 'user', component: UserComponent }
];
