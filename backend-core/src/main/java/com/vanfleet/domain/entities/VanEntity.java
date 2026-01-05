package com.vanfleet.domain.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;
import java.util.List;

@Entity
@Table(name = "vans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id; // Scalable UUID Primary Key

    @Column(nullable = false, unique = true)
    private String licensePlate;

    private String vin;

    private String model; // e.g., "Dodge ProMaster 1500"

    @Enumerated(EnumType.STRING)
    private VehicleStatus status; // ACTIVE, MAINTENANCE, INACTIVE

    @OneToMany(mappedBy = "van", cascade = CascadeType.ALL)
    private List<TripEntity> trips;

    @Column(name = "fleet_id")
    private UUID fleetId; // Supports multi-tenant fleet ownership
}
