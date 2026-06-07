package com.stockeasy.stockeasy.dto.response;

import java.time.LocalDate;
import java.util.List;

public record ExpiredStockReportDto(
        LocalDate asOf,
        long totalExpiredBatches,
        int totalExpiredUnits,
        double totalLoss,
        List<ExpiredStockLineDto> items
) {
}
