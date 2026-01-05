package com.vanfleet.domain.repositories;

import com.vanfleet.domain.entities.VanEntity;
import com.vanfleet.domain.entities.VehicleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface VanRepository extends JpaRepository<VanEntity, UUID> {

    // Find all vans belonging to a specific fleet for multi-tenant scaling
    List<VanEntity> findByFleetId(UUID fleetId);

    // Filter fleet by status (e.g., finding all vans currently in MAINTENANCE)
    List<VanEntity> findByStatus(VehicleStatus status);

    // Verify van existence by license plate for unique onboarding
    boolean existsByLicensePlate(String licensePlate);
}
