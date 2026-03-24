package com.viagens.dto;

import java.math.BigDecimal;
import java.util.Map;

public record CurrencyRateDTO(
        Map<String, RateDetail> rates) {
    public record RateDetail(
            String code,
            String codein,
            String name,
            BigDecimal bid) {
    }
}
