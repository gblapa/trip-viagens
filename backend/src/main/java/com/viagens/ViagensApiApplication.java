package com.viagens;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ViagensApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ViagensApiApplication.class, args);
	}

}
