package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "drugs")
public class Drug {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String drugName;
    private String genericName;
    private String brand;
    private String dose;

    @Column(length = 2000)
    private String composition;

    private String manufacturer;
    private String route;
    private String formulation;

    @Column(length = 2000)
    private String sideEffects;

    @Column(length = 2000)
    private String interactions;

    @Column(length = 2000)
    private String contraindications;

    @Column(length = 2000)
    private String warnings;
}
