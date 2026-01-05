package com.vanfleet.services;

import com.vanfleet.domain.entities.TripEntity;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface TripService {
    TripEntity startTrip(UUID vanId, Integer startOdometer, String purpose);

    TripEntity endTrip(UUID tripId, int endOdometer);

    List<TripEntity> getIrsCompliantLogs(UUID vanId, LocalDateTime start, LocalDateTime end);
}
