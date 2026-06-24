package com.contestracker.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.contestracker.backend.model.Contest;

@Repository
public interface ContestRepository extends MongoRepository<Contest,String>{

}
