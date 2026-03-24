package com.viagens.dto;

import java.time.LocalDateTime;

public record BookingResponseDTO(
        Long id,
        String userName,
        String userEmail,
        String packageName,
        LocalDateTime bookingDate,
        String status) {
}
