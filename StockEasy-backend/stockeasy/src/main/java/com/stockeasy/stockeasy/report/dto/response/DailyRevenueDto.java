package com.stockeasy.stockeasy.report.dto.response;

import java.time.LocalDate;

public record DailyRevenueDto(
        LocalDate day,
        double revenue
) {
}
