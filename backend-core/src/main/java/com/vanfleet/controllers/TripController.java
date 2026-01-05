package com.vanfleet.controllers;

import com.vanfleet.domain.entities.TripEntity;
import com.vanfleet.dto.TripRequest;
import com.vanfleet.services.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/trips") // RESTful plural naming
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    /**
     * Start a new trip via the mobile app.
     * Request body: { "vanId": "...", "startOdometer": 1500, "purpose": "Delivery"
     * }
     */
    @PostMapping("/start")
    public ResponseEntity<TripEntity> startTrip(@RequestBody TripRequest request) {
        TripEntity trip = tripService.startTrip(
                request.getVanId(),
                request.getStartOdometer(),
                request.getPurpose());
        return new ResponseEntity<>(trip, HttpStatus.CREATED); // 201 Created
    }

    /**
     * End a trip and trigger AI expense parsing.
     * Path variable 'id' uses native Spring UUID support.
     */
    @PutMapping("/{id}/end")
    public ResponseEntity<TripEntity> endTrip(
            @PathVariable UUID id,
            @RequestParam int endOdometer) {
        TripEntity trip = tripService.endTrip(id, endOdometer);
        return ResponseEntity.ok(trip);
    }

    /**
     * Retrieve IRS-compliant mileage logs for a specific van.
     * Supports filtering by date range.
     */
    @GetMapping("/logs/{vanId}")
    public ResponseEntity<List<TripEntity>> getLogs(
            @PathVariable UUID vanId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(tripService.getIrsCompliantLogs(vanId, start, end));
    }
}
