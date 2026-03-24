import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './interceptors/auth.interceptor';
import { HomeComponent } from './components/home/home.component';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter([
            { path: '', component: HomeComponent }
        ]),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideAnimations()
    ]
};
