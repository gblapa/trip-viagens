package com.viagens.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class CurrencyService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public CurrencyService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    private static final String API_URL = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL";

    public Map<String, BigDecimal> getRates() {
        Map<String, BigDecimal> rates = new HashMap<>();
        try {
            String response = restTemplate.getForObject(API_URL, String.class);
            JsonNode root = objectMapper.readTree(response);

            rates.put("USD", root.path("USDBRL").path("bid").decimalValue());
            rates.put("EUR", root.path("EURBRL").path("bid").decimalValue());
            rates.put("BRL", BigDecimal.ONE);

        } catch (Exception e) {
            // Fallback rates if API fails
            rates.put("USD", new BigDecimal("5.00"));
            rates.put("EUR", new BigDecimal("5.40"));
            rates.put("BRL", BigDecimal.ONE);
        }
        return rates;
    }
}
