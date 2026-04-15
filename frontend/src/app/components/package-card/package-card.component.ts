import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelPackage } from '../../models/travel-package.model';
import { CurrencyService } from '../../services/currency.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-package-card',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, TagModule],
    template: `
    <p-card [header]="pkg.name" class="h-full shadow-4 hover:shadow-8 transition-duration-300">
      <ng-template pTemplate="header">
        <div class="relative">
          <img [src]="pkg.imageUrl" [alt]="pkg.name" class="w-full border-round-top h-12rem object-cover" />
          <p-tag [value]="pkg.durationDays + ' dias'" severity="info" class="absolute top-0 right-0 m-2"></p-tag>
        </div>
      </ng-template>
      
      <p class="text-secondary flex align-items-center gap-2 mt-0">
        <i class="pi pi-map-marker text-blue-500"></i> {{ pkg.destination }}
      </p>
      
      <p class="line-height-3 text-sm text-400 mb-4 h-3rem overflow-hidden text-overflow-ellipsis">
        {{ pkg.description }}
      </p>

      <div class="flex justify-content-between align-items-center">
        <div>
          <span class="text-xs text-400 block">A partir de</span>
          <span class="text-2xl font-bold text-gray-800">
            {{ currencyService.currencySymbol() }} {{ currencyService.convert(pkg.priceInReais) | number:'1.2-2' }}
          </span>
        </div>
        <p-button label="Garantir" icon="pi pi-check" [outlined]="true" (onClick)="onGarantir.emit(pkg)"></p-button>
      </div>
      
      <div class="mt-3">
        <span class="text-xs" [ngClass]="pkg.availableSlots < 5 ? 'text-orange-400' : 'text-green-400'">
            {{ pkg.availableSlots }} vagas restantes
        </span>
      </div>
    </p-card>
  `
})
export class PackageCardComponent {
    @Input({ required: true }) pkg!: TravelPackage;
    @Output() onGarantir = new EventEmitter<TravelPackage>();

    currencyService = inject(CurrencyService);
}
