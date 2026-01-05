package com.vanfleet.services.impl;

import com.vanfleet.domain.entities.TripEntity;
import com.vanfleet.domain.entities.VanEntity;
import com.vanfleet.domain.entities.VehicleStatus;
import com.vanfleet.domain.repositories.TripRepository;
import com.vanfleet.domain.repositories.VanRepository;
import com.vanfleet.services.AIExpenseAgent;
import com.vanfleet.services.TripService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;
    private final VanRepository vanRepository;
    private final AIExpenseAgent aiExpenseAgent;

    @Override
    @Transactional
    public TripEntity startTrip(UUID vanId, Integer startOdometer, String purpose) {
        log.info("Starting trip for Van ID: {}", vanId);

        VanEntity van = vanRepository.findById(vanId)
                .orElseThrow(() -> new IllegalArgumentException("Van not found with ID: " + vanId));

        // Logic check: Ensure van is active before starting trip
        if (van.getStatus() != VehicleStatus.ACTIVE) {
            log.warn("Attempted to start trip for inactive van: {}", vanId);
            // Proceeding for now, but logging warning.
            // Ideally we might throw exception based on strict business rules.
        }

        TripEntity trip = TripEntity.builder()
                .van(van)
                .startOdometer(startOdometer)
                .startTime(LocalDateTime.now())
                .businessPurpose(purpose)
                .build();

        return tripRepository.save(trip);
    }

    @Override
    @Transactional
    public TripEntity endTrip(UUID tripId, int endOdometer) {
        log.info("Ending trip ID: {}", tripId);

        TripEntity trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new IllegalArgumentException("Trip not found with ID: " + tripId));

        trip.setEndOdometer(endOdometer);
        trip.setEndTime(LocalDateTime.now());

        // Calculate Expenses via AI Agent
        double expenses = aiExpenseAgent.processTripExpenses(tripId);
        trip.setTotalExpenses(expenses);

        return tripRepository.save(trip);
    }

    @Override
    public List<TripEntity> getIrsCompliantLogs(UUID vanId, LocalDateTime start, LocalDateTime end) {
        return tripRepository.findByVanIdAndStartTimeBetween(vanId, start, end);
    }
}
