package com.viagens.service;

import com.viagens.dto.TravelPackageDTO;
import com.viagens.entity.TravelPackage;
import com.viagens.repository.TravelPackageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TravelPackageService {

    private final TravelPackageRepository repository;

    public TravelPackageService(TravelPackageRepository repository) {
        this.repository = repository;
    }

    public List<TravelPackageDTO> findAll(String destination, BigDecimal maxPrice) {
        return repository.findByFilters(destination, maxPrice)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TravelPackageDTO findById(Long id) {
        return repository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Package not found"));
    }

    @Transactional
    public TravelPackageDTO create(TravelPackage pkg) {
        return convertToDTO(repository.save(pkg));
    }

    private TravelPackageDTO convertToDTO(TravelPackage pkg) {
        return new TravelPackageDTO(
                pkg.getId(),
                pkg.getName(),
                pkg.getDestination(),
                pkg.getDescription(),
                pkg.getPriceInReais(),
                pkg.getDurationDays(),
                pkg.getImageUrl(),
                pkg.getAvailableSlots());
    }
}
