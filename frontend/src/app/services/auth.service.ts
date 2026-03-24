import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var google: any;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubject = new BehaviorSubject<any>(null);
    user$ = this.userSubject.asObservable();

    // Using signal for easy access in templates
    isAuthenticated = signal(false);
    user = signal<any>(null);
    token = signal<string | null>(null);

    constructor() {
        this.initGoogleAuth();
    }

    private initGoogleAuth() {
        // Note: In a real app, you'd load the script via index.html or a resolver
        // This is a simplified version of the logic
    }

    handleGoogleSignIn(response: any) {
        const payload = this.decodeToken(response.credential);
        this.token.set(response.credential);
        this.userSubject.next(payload);
        this.user.set(payload);
        this.isAuthenticated.set(true);
        localStorage.setItem('google_token', response.credential);
    }

    private decodeToken(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    logout() {
        this.userSubject.next(null);
        this.token.set(null);
        this.isAuthenticated.set(false);
        localStorage.removeItem('google_token');
    }

    getToken(): string | null {
        return this.token() || localStorage.getItem('google_token');
    }
}
