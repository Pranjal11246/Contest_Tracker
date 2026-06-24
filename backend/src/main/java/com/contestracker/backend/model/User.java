package com.contestracker.backend.model;


import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id;

    private String email;

    private String password;

    @Builder.Default
    private String role = "USER";

    @Builder.Default
    private boolean verified = false;

    private String otp;

    private LocalDateTime otpExpiry;
}