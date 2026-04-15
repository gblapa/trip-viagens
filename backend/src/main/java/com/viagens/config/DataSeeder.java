package com.viagens.config;

import com.viagens.entity.TravelPackage;
import com.viagens.repository.TravelPackageRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataSeeder implements CommandLineRunner {

        private final TravelPackageRepository repository;

        public DataSeeder(TravelPackageRepository repository) {
                this.repository = repository;
        }

        @Override
        public void run(String... args) {
                if (repository.count() == 0) {
                        List<TravelPackage> packages = List.of(
                                        TravelPackage.builder()
                                                        .name("Paraíso em Cancún")
                                                        .destination("Cancún, México")
                                                        .description("7 dias inesquecíveis no Caribe Mexicano com tudo incluso.")
                                                        .priceInReais(new BigDecimal("7500.00"))
                                                        .durationDays(7)
                                                        .imageUrl(
                                                                        "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=800&q=80")
                                                        .maxSlots(20)
                                                        .availableSlots(15)
                                                        .build(),
                                        TravelPackage.builder()
                                                        .name("Neve em Bariloche")
                                                        .destination("Bariloche, Argentina")
                                                        .description("Aproveite o melhor da neve argentina com tours exclusivos.")
                                                        .priceInReais(new BigDecimal("4200.00"))
                                                        .durationDays(5)
                                                        .imageUrl(
                                                                        "https://images.unsplash.com/photo-1549213821-4708d624e1d1?auto=format&fit=crop&w=800&q=80")
                                                        .maxSlots(15)
                                                        .availableSlots(8)
                                                        .build(),
                                        TravelPackage.builder()
                                                        .name("Luzes de Paris")
                                                        .destination("Paris, França")
                                                        .description("O romance e a cultura da Cidade Luz te esperam.")
                                                        .priceInReais(new BigDecimal("12000.00"))
                                                        .durationDays(10)
                                                        .imageUrl(
                                                                        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80")
                                                        .maxSlots(10)
                                                        .availableSlots(3)
                                                        .build(),
                                        TravelPackage.builder()
                                                        .name("Safari na África")
                                                        .destination("Kruger Park, África do Sul")
                                                        .description("Aventura selvagem em um dos maiores parques do mundo.")
                                                        .priceInReais(new BigDecimal("9800.00"))
                                                        .durationDays(8)
                                                        .imageUrl(
                                                                        "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80")
                                                        .maxSlots(12)
                                                        .availableSlots(12)
                                                        .build(),
                                        TravelPackage.builder()
                                                        .name("Tóquio Futurista")
                                                        .destination("Tóquio, Japão")
                                                        .description("Descubra a mistura única de tradição e alta tecnologia.")
                                                        .priceInReais(new BigDecimal("15500.00"))
                                                        .durationDays(12)
                                                        .imageUrl(
                                                                        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80")
                                                        .maxSlots(8)
                                                        .availableSlots(5)
                                                        .build(),
                                        TravelPackage.builder()
                                                        .name("Mistérios do Egito")
                                                        .destination("Cairo, Egito")
                                                        .description("Explore as pirâmides e toda a história milenar dos faraós.")
                                                        .priceInReais(new BigDecimal("8900.00"))
                                                        .durationDays(9)
                                                        .imageUrl(
                                                                        "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80")
                                                        .maxSlots(15)
                                                        .availableSlots(10)
                                                        .build());
                        repository.saveAll(packages);
                }
        }
}
