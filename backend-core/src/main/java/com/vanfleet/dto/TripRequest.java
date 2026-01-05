package com.vanfleet.dto;

import lombok.Data;
import java.util.UUID;

/**
 * DTO for capturing trip start requests from mobile/dashboard.
 * This ensures strict data validation before hitting the Service layer.
 */
@Data
public class TripRequest {

    // The unique ID of the van starting the trip
    private UUID vanId;

    // Current odometer reading at the start of the trip
    private int startOdometer;

    // Business purpose for IRS compliance (e.g., "Package Delivery")
    private String purpose;

    // Optional: Driver ID for multi-driver fleet scaling
    private UUID driverId;
}
