import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageService } from '../../services/package.service';
import { PackageCardComponent } from '../package-card/package-card.component';
import { TravelPackage } from '../../models/travel-package.model';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PackageCardComponent,
    InputTextModule,
    SliderModule,
    FormsModule,
    FloatLabelModule,
    ProgressSpinnerModule,
    BookingModalComponent
  ],
  template: `
    <main class="container">
      <header class="text-center mb-6">
        <h2 class="text-4xl md:text-6xl font-black mb-2 m-0 gradient-text">Sua Próxima Aventura</h2>
        <p class="text-secondary text-xl">Descubra pacotes exclusivos ao redor do mundo</p>
      </header>

      <div class="glass p-4 mb-6 flex flex-column md:flex-row gap-4 align-items-center">
        <p-floatLabel class="flex-1">
          <input pInputText id="destination" [(ngModel)]="filters.destination" (input)="search()" class="w-full" />
          <label for="destination">Para onde você quer ir?</label>
        </p-floatLabel>

        <div class="flex-1 flex flex-column gap-2 px-3">
            <label class="text-xs text-400">Preço Máximo: R$ {{ filters.maxPrice }}</label>
            <p-slider [(ngModel)]="filters.maxPrice" (onSlideEnd)="search()" [min]="0" [max]="20000" [step]="500" class="w-full"></p-slider>
        </div>
      </div>

      @if (packageService.loading$ | async) {
        <div class="flex justify-content-center p-8">
            <p-progressSpinner ariaLabel="loading"></p-progressSpinner>
        </div>
      } @else {
        <div class="grid">
          @for (pkg of packageService.packages$ | async; track pkg.id) {
            <div class="col-12 md:col-6 lg:col-4 p-3">
              <app-package-card [pkg]="pkg" (onGarantir)="openBooking($event)"></app-package-card>
            </div>
          } @empty {
              <div class="col-12 text-center p-8 glass">
                  <i class="pi pi-search text-4xl text-400 mb-3 block"></i>
                  <p>Nenhum pacote encontrado para sua busca.</p>
              </div>
          }
        </div>
      }
    </main>

    <app-booking-modal 
        [(visible)]="modalVisible" 
        [pkg]="selectedPackage">
    </app-booking-modal>
  `
})
export class HomeComponent implements OnInit {
  packageService = inject(PackageService);

  filters = {
    destination: '',
    maxPrice: 20000
  };

  modalVisible = false;
  selectedPackage: TravelPackage | null = null;

  ngOnInit() {
    this.packageService.getPackages();
  }

  search() {
    this.packageService.getPackages(this.filters.destination, this.filters.maxPrice);
  }

  openBooking(pkg: TravelPackage) {
    this.selectedPackage = pkg;
    this.modalVisible = true;
  }
}
