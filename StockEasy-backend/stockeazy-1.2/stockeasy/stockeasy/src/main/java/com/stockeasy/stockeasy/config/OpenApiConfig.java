package com.stockeasy.stockeasy.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI stockEasyOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("StockEasy – Pharmacy Stock Management System")
                        .description(
                                "Backend APIs for managing pharmacy stock, " +
                                "vendors, customers, purchases, sales (FEFO), " +
                                "and reports like near-expiry, regular customers, " +
                                "and trusted vendors."
                        )
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("StockEasy Team")
                                .email("support@stockeasy.com")
                        )
                );
    }
}
