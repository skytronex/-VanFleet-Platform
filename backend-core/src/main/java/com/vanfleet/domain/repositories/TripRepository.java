package com.vanfleet.domain.repositories;

import com.vanfleet.domain.entities.TripEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface TripRepository extends JpaRepository<TripEntity, UUID> {

    // Retrieve all trips for a specific van within a date range for tax modeling
    List<TripEntity> findByVanIdAndStartTimeBetween(UUID vanId, LocalDateTime start, LocalDateTime end);

    // Custom query to find trips with high expenses for AI Marking Agent review
    @Query("SELECT t FROM TripEntity t WHERE t.totalExpenses > :threshold")
    List<TripEntity> findHighExpenseTrips(@Param("threshold") Double threshold);

    // Fetch the most recent trip for a van to calculate current odometer status
    TripEntity findFirstByVanIdOrderByStartTimeDesc(UUID vanId);
}
