package com.vanfleet.domain.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "trips")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "van_id", nullable = false)
    private VanEntity van;

    @Column(nullable = false)
    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Integer startOdometer;

    private Integer endOdometer;

    private String businessPurpose; // IRS compliance field

    @Column(precision = 10, scale = 2)
    private Double totalExpenses; // Linked to the Marking Agent results

    @Version
    private Long version; // Optimistic locking for concurrent fleet updates
}
