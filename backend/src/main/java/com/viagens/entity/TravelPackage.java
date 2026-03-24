package com.viagens.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "travel_packages")
public class TravelPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String destination;

    @Column(length = 1000)
    private String description;

    private BigDecimal priceInReais;
    private Integer durationDays;
    private String imageUrl;
    private Integer maxSlots;
    private Integer availableSlots;

    public TravelPackage() {
    }

    public TravelPackage(Long id, String name, String destination, String description, BigDecimal priceInReais,
            Integer durationDays, String imageUrl, Integer maxSlots, Integer availableSlots) {
        this.id = id;
        this.name = name;
        this.destination = destination;
        this.description = description;
        this.priceInReais = priceInReais;
        this.durationDays = durationDays;
        this.imageUrl = imageUrl;
        this.maxSlots = maxSlots;
        this.availableSlots = availableSlots;
    }

    public static TravelPackageBuilder builder() {
        return new TravelPackageBuilder();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPriceInReais() {
        return priceInReais;
    }

    public void setPriceInReais(BigDecimal priceInReais) {
        this.priceInReais = priceInReais;
    }

    public Integer getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(Integer durationDays) {
        this.durationDays = durationDays;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getMaxSlots() {
        return maxSlots;
    }

    public void setMaxSlots(Integer maxSlots) {
        this.maxSlots = maxSlots;
    }

    public Integer getAvailableSlots() {
        return availableSlots;
    }

    public void setAvailableSlots(Integer availableSlots) {
        this.availableSlots = availableSlots;
    }

    public static class TravelPackageBuilder {
        private Long id;
        private String name;
        private String destination;
        private String description;
        private BigDecimal priceInReais;
        private Integer durationDays;
        private String imageUrl;
        private Integer maxSlots;
        private Integer availableSlots;

        public TravelPackageBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public TravelPackageBuilder name(String name) {
            this.name = name;
            return this;
        }

        public TravelPackageBuilder destination(String destination) {
            this.destination = destination;
            return this;
        }

        public TravelPackageBuilder description(String description) {
            this.description = description;
            return this;
        }

        public TravelPackageBuilder priceInReais(BigDecimal priceInReais) {
            this.priceInReais = priceInReais;
            return this;
        }

        public TravelPackageBuilder durationDays(Integer durationDays) {
            this.durationDays = durationDays;
            return this;
        }

        public TravelPackageBuilder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public TravelPackageBuilder maxSlots(Integer maxSlots) {
            this.maxSlots = maxSlots;
            return this;
        }

        public TravelPackageBuilder availableSlots(Integer availableSlots) {
            this.availableSlots = availableSlots;
            return this;
        }

        public TravelPackage build() {
            return new TravelPackage(id, name, destination, description, priceInReais, durationDays, imageUrl, maxSlots,
                    availableSlots);
        }
    }
}
