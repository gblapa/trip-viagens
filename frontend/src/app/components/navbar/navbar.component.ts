import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../services/currency.service';
import { AuthService } from '../../services/auth.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule, ButtonModule, AvatarModule],
  template: `
    <nav class="flex justify-content-between align-items-center p-3 glass mx-3 mt-3">
      <div class="flex align-items-center gap-2">
        <i class="pi pi-send text-yellow-400 text-3xl"></i>
        <h1 class="m-0 text-xl font-bold gradient-text">Trip.Viagens</h1>
      </div>

      <div class="flex align-items-center gap-4">
        <p-dropdown 
          [options]="currencyOptions" 
          [(ngModel)]="selectedCurrency"
          (onChange)="onCurrencyChange($event.value)"
          optionLabel="label" 
          optionValue="value"
          class="currency-dropdown">
        </p-dropdown>

        @if (authService.user$ | async; as user) {
          <div class="flex align-items-center gap-2">
            <span class="text-sm hidden md:block">{{ user.name }}</span>
            <p-avatar [image]="user.picture" shape="circle"></p-avatar>
            <p-button icon="pi pi-sign-out" [rounded]="true" [text]="true" (onClick)="authService.logout()"></p-button>
          </div>
        } @else {
          <p-button label="Login" icon="pi pi-google" size="small" (onClick)="login()"></p-button>
        }
      </div>
    </nav>
  `
})
export class NavbarComponent {
  currencyService = inject(CurrencyService);
  authService = inject(AuthService);

  currencyOptions = [
    { label: 'BRL (R$)', value: 'BRL' },
    { label: 'USD ($)', value: 'USD' },
    { label: 'EUR (€)', value: 'EUR' }
  ];

  selectedCurrency = 'BRL';

  onCurrencyChange(value: any) {
    this.currencyService.setCurrency(value);
  }

  login() {
    // In a real app, this would trigger the Google GSI prompt
    alert('Simulando Login Google. No sistema real, o modal de Garantir abrirá o login.');
  }
}
