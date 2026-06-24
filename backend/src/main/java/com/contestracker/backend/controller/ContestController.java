package com.contestracker.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.contestracker.backend.model.Contest;
import com.contestracker.backend.service.ContestService;



@RestController
@RequestMapping("/contests")
public class ContestController {
    
    @Autowired
    private ContestService contestService;

    @GetMapping("/allcontests")
    public List<Contest> getAllContests() {
        return contestService.getAllContests();
    }

    @PostMapping("/savecontest")
    public Contest saveContest(@RequestBody Contest contest){  
        return contestService.saveContest(contest);
    }


}
