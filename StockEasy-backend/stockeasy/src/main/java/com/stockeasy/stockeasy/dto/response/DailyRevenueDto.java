package com.stockeasy.stockeasy.dto.response;

import java.time.LocalDate;

public record DailyRevenueDto(
        LocalDate day,
        double revenue
) {
}
