import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    
    <footer class="p-4 text-center text-400 text-sm mt-8 border-top-1 border-white-alpha-10">
      &copy; 2026 Trip.Viagens - Experiências que transformam.
    </footer>
  `
})
export class AppComponent { }
