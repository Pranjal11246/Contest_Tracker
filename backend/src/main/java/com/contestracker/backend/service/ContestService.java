package com.contestracker.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.contestracker.backend.model.Contest;
import com.contestracker.backend.repository.ContestRepository;

@Service
public class ContestService {

    @Autowired
    ContestRepository contestrepository;

    public List<Contest> getAllContests() {
        return contestrepository.findAll();
    }

    public Contest saveContest(Contest contest) {
        return contestrepository.save(contest);
    }

    public List<Contest> saveAllContests(List<Contest> contests) {
        return contestrepository.saveAll(contests);
    }
}
