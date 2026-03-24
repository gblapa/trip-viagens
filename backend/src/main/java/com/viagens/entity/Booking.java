package com.viagens.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;
    private String userName;

    @ManyToOne
    @JoinColumn(name = "package_id")
    private TravelPackage travelPackage;

    private LocalDateTime bookingDate;
    private String status;

    public Booking() {
    }

    public Booking(Long id, String userEmail, String userName, TravelPackage travelPackage, LocalDateTime bookingDate,
            String status) {
        this.id = id;
        this.userEmail = userEmail;
        this.userName = userName;
        this.travelPackage = travelPackage;
        this.bookingDate = bookingDate;
        this.status = status;
    }

    public static BookingBuilder builder() {
        return new BookingBuilder();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public TravelPackage getTravelPackage() {
        return travelPackage;
    }

    public void setTravelPackage(TravelPackage travelPackage) {
        this.travelPackage = travelPackage;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public static class BookingBuilder {
        private Long id;
        private String userEmail;
        private String userName;
        private TravelPackage travelPackage;
        private LocalDateTime bookingDate;
        private String status;

        public BookingBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public BookingBuilder userEmail(String userEmail) {
            this.userEmail = userEmail;
            return this;
        }

        public BookingBuilder userName(String userName) {
            this.userName = userName;
            return this;
        }

        public BookingBuilder travelPackage(TravelPackage travelPackage) {
            this.travelPackage = travelPackage;
            return this;
        }

        public BookingBuilder bookingDate(LocalDateTime bookingDate) {
            this.bookingDate = bookingDate;
            return this;
        }

        public BookingBuilder status(String status) {
            this.status = status;
            return this;
        }

        public Booking build() {
            return new Booking(id, userEmail, userName, travelPackage, bookingDate, status);
        }
    }
}
