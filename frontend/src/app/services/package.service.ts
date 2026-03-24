import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { TravelPackage } from '../models/travel-package.model';

@Injectable({
    providedIn: 'root'
})
export class PackageService {
    private apiUrl = 'http://localhost:8080/api/packages';

    private packagesSubject = new BehaviorSubject<TravelPackage[]>([]);
    packages$ = this.packagesSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    constructor(private http: HttpClient) { }

    getPackages(destination?: string, maxPrice?: number): void {
        this.loadingSubject.next(true);
        let params = new HttpParams();
        if (destination) params = params.set('destination', destination);
        if (maxPrice) params = params.set('maxPrice', maxPrice.toString());

        this.http.get<TravelPackage[]>(this.apiUrl, { params })
            .pipe(finalize(() => this.loadingSubject.next(false)))
            .subscribe(pkgs => this.packagesSubject.next(pkgs));
    }

    getPackageById(id: number): Observable<TravelPackage> {
        return this.http.get<TravelPackage>(`${this.apiUrl}/${id}`);
    }
}
