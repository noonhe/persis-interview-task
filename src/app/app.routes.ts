import { Routes } from '@angular/router';
import { ContactInfoFormComponent } from './pages/contact-info-form/contact-info-form.component';

export const routes: Routes = [
    {
        path:'contact-form',
        component: ContactInfoFormComponent
    },
    {
        path: '',
        redirectTo: 'contact-form',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'contact-form',
        pathMatch: 'full'
    }
];
