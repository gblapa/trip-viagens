import { Component, Input, Output, EventEmitter, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelPackage } from '../../models/travel-package.model';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import emailjs from '@emailjs/browser';

declare var google: any;

@Component({
    selector: 'app-booking-modal',
    standalone: true,
    imports: [CommonModule, DialogModule, ButtonModule, ToastModule],
    providers: [MessageService],
    template: `
    <p-toast></p-toast>
    <p-dialog 
        [header]="'Reserva: ' + pkg?.name" 
        [(visible)]="visible" 
        (onHide)="visibleChange.emit(false)"
        [modal]="true" 
        [draggable]="false" 
        [resizable]="false"
        class="glass-dialog">
        
        <div class="flex flex-column gap-4 py-3" style="min-width: 350px">
            @if (!authService.isAuthenticated()) {
                <div class="text-center">
                    <i class="pi pi-lock text-6xl text-blue-400 mb-3"></i>
                    <h3 class="mt-0">Acesso Necessário</h3>
                    <p class="text-secondary mb-4">Para garantir este pacote, faça login com o Google.</p>
                    <div #googleBtn class="flex justify-content-center"></div>
                </div>
            } @else {
                <div class="booking-summary glass p-3 border-round-xl">
                    <p class="mt-0 mb-2 font-bold">{{ pkg?.destination }}</p>
                    <p class="text-xs text-400 mb-3 line-height-3">{{ pkg?.description }}</p>
                    <div class="flex justify-content-between font-bold border-top-1 border-white-alpha-10 pt-3">
                        <span>Total</span>
                        <span class="text-blue-400">R$ {{ pkg?.priceInReais | number:'1.2-2' }}</span>
                    </div>
                </div>

                <p-button 
                    label="Confirmar Reserva Agora" 
                    icon="pi pi-check-circle" 
                    [loading]="loading"
                    class="w-full" 
                    styleClass="w-full p-button-lg shadow-4"
                    (onClick)="confirmBooking()">
                </p-button>
                <p class="text-center text-xs text-400 m-0">
                    Você receberá um e-mail de confirmação em instantes.
                </p>
            }
        </div>
    </p-dialog>
  `
})
export class BookingModalComponent implements AfterViewInit {
    @Input() visible = false;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Input() pkg: TravelPackage | null = null;
    @ViewChild('googleBtn') googleBtn!: ElementRef;

    authService = inject(AuthService);
    bookingService = inject(BookingService);
    messageService = inject(MessageService);

    loading = false;

    // EmailJS Parameters (User should replace these)
    private readonly EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    private readonly EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    private readonly EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    ngAfterViewInit() {
        this.renderGoogleButton();
    }

    renderGoogleButton() {
        if (typeof google !== 'undefined' && this.googleBtn) {
            google.accounts.id.initialize({
                client_id: '879107481329-i7go3frd1ou4i63ua6qu42q9flb0q8cu.apps.googleusercontent.com',
                callback: (resp: any) => {
                    this.authService.handleGoogleSignIn(resp);
                }
            });
            google.accounts.id.renderButton(this.googleBtn.nativeElement, { theme: 'filled_black', size: 'large' });
        }
    }

    confirmBooking() {
        if (!this.pkg) return;

        this.loading = true;
        this.bookingService.createBooking({ packageId: this.pkg.id }).subscribe({
            next: (res) => {
                this.sendConfirmationEmail();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Sua reserva foi confirmada. Verifique seu e-mail.'
                });
                setTimeout(() => {
                    this.loading = false;
                    this.visibleChange.emit(false);
                }, 2000);
            },
            error: (err) => {
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ops!',
                    detail: 'Erro ao processar reserva. Tente novamente.'
                });
            }
        });
    }

    private sendConfirmationEmail() {
        if (!this.pkg || !this.authService.user()) return;

        const user = this.authService.user();
        const templateParams = {
            to_name: user.name,
            to_email: user.email,
            package_name: this.pkg.name,
            destination: this.pkg.destination,
            price: this.pkg.priceInReais
        };

        emailjs.send(
            this.EMAILJS_SERVICE_ID,
            this.EMAILJS_TEMPLATE_ID,
            templateParams,
            this.EMAILJS_PUBLIC_KEY
        ).then(
            (response) => {
                console.log('Email enviado com sucesso!', response.status, response.text);
            },
            (err) => {
                console.error('Falha ao enviar e-mail via EmailJS:', err);
            }
        );
    }
}
