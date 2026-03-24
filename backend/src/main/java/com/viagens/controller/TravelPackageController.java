package com.viagens.controller;

import com.viagens.dto.TravelPackageDTO;
import com.viagens.service.TravelPackageService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "*")
public class TravelPackageController {

    private final TravelPackageService service;

    public TravelPackageController(TravelPackageService service) {
        this.service = service;
    }

    @GetMapping
    public List<TravelPackageDTO> getAll(
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) BigDecimal maxPrice) {
        return service.findAll(destination, maxPrice);
    }

    @GetMapping("/{id}")
    public TravelPackageDTO getById(@PathVariable Long id) {
        return service.findById(id);
    }
}
