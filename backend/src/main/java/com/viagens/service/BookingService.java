package com.viagens.service;

import com.viagens.dto.BookingRequestDTO;
import com.viagens.dto.BookingResponseDTO;
import com.viagens.entity.Booking;
import com.viagens.entity.TravelPackage;
import com.viagens.repository.BookingRepository;
import com.viagens.repository.TravelPackageRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final TravelPackageRepository packageRepository;

    public BookingService(BookingRepository bookingRepository, TravelPackageRepository packageRepository) {
        this.bookingRepository = bookingRepository;
        this.packageRepository = packageRepository;
    }

    @Transactional
    public BookingResponseDTO createBooking(BookingRequestDTO request) {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userEmail = jwt.getClaimAsString("email");
        String userName = jwt.getClaimAsString("name");

        TravelPackage pkg = packageRepository.findById(request.packageId())
                .orElseThrow(() -> new RuntimeException("Package not found"));

        if (pkg.getAvailableSlots() <= 0) {
            throw new RuntimeException("No slots available");
        }

        pkg.setAvailableSlots(pkg.getAvailableSlots() - 1);
        packageRepository.save(pkg);

        Booking booking = Booking.builder()
                .userEmail(userEmail)
                .userName(userName)
                .travelPackage(pkg)
                .bookingDate(LocalDateTime.now())
                .status("CONFIRMED")
                .build();

        booking = bookingRepository.save(booking);

        return new BookingResponseDTO(
                booking.getId(),
                booking.getUserName(),
                booking.getUserEmail(),
                pkg.getName(),
                booking.getBookingDate(),
                booking.getStatus());
    }
}
