package com.viagens.repository;

import com.viagens.entity.TravelPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {

    @Query("SELECT p FROM TravelPackage p WHERE " +
            "(:destination IS NULL OR LOWER(p.destination) LIKE LOWER(CONCAT('%', :destination, '%')) OR LOWER(p.name) LIKE LOWER(CONCAT('%', :destination, '%'))) AND " +
            "(:maxPrice IS NULL OR p.priceInReais <= :maxPrice)")
    List<TravelPackage> findByFilters(@Param("destination") String destination,
            @Param("maxPrice") BigDecimal maxPrice);
}
