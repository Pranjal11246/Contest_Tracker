package com.contestracker.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "contests")
public class Contest {
    @Id
    private String id;
    
    private String platform;
    private String title;
    private String url;
    private LocalDateTime start;
    private LocalDateTime end;

    private Integer duration;
    private String status;
    
}
