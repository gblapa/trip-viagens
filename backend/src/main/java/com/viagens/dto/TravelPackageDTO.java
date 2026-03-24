package com.viagens.dto;

import java.math.BigDecimal;

public record TravelPackageDTO(
        Long id,
        String name,
        String destination,
        String description,
        BigDecimal priceInReais,
        Integer durationDays,
        String imageUrl,
        Integer availableSlots) {
}
