import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyType, CurrencyRates } from '../models/currency.model';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrencyService {
    private apiUrl = 'http://localhost:8080/api/currencies';

    // State using Signals
    rates = signal<CurrencyRates>({ BRL: 1, USD: 5, EUR: 5.4 });
    selectedCurrency = signal<CurrencyType>('BRL');

    constructor(private http: HttpClient) {
        this.loadRates();
    }

    loadRates() {
        this.http.get<CurrencyRates>(`${this.apiUrl}?t=${new Date().getTime()}`).subscribe(newRates => {
            this.rates.set(newRates);
        });
    }

    setCurrency(type: CurrencyType) {
        this.selectedCurrency.set(type);
    }

    convert(valueBRL: number): number {
        let rate = this.rates()[this.selectedCurrency()];
        if (!rate) rate = 1; // fallback se for undefined ou 0
        if (this.selectedCurrency() === 'BRL') return valueBRL;
        return valueBRL / rate;
    }

    currencySymbol = computed(() => {
        switch (this.selectedCurrency()) {
            case 'USD': return '$';
            case 'EUR': return '€';
            default: return 'R$';
        }
    });
}
