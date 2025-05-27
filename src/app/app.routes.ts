import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TimelinesPageComponent } from './pages/timelines-page/timelines-page.component';

export const routes: Routes = [
	// Main pages
	{ path: '', component: TimelinesPageComponent, title: 'Timelines' },
	{ path: 'login', component: LoginPageComponent, title: 'login' },
	{ path: 'profile', component: ProfilePageComponent, title: 'profile' },

	// Error pages
	{ path: '**', component: NotFoundPageComponent, title: '404 Page not found' },
];
