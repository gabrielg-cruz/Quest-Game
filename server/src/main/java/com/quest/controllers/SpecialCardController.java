package com.quest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quest.dto.SpecialCard.SpecialCardCreateDTO;
import com.quest.dto.SpecialCard.SpecialCardResponseDTO;
import com.quest.dto.SpecialCard.SpecialCardUpdateDTO;
import com.quest.services.SpecialCardService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/specialCards")
public class SpecialCardController {
    private final SpecialCardService specialCardService;

    @Autowired
    public SpecialCardController(SpecialCardService specialCardService) {
        this.specialCardService = specialCardService;
    }

    @PostMapping
    public ResponseEntity<SpecialCardResponseDTO> createSpecialCard(
            @RequestBody SpecialCardCreateDTO specialCardCreateDTO) {
        SpecialCardResponseDTO createdSpecialCard = specialCardService.create(specialCardCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSpecialCard);
    }

    @GetMapping
    public ResponseEntity<List<SpecialCardResponseDTO>> findAllSpecialCards() {
        List<SpecialCardResponseDTO> specialCards = specialCardService.findAll();
        return ResponseEntity.ok(specialCards);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpecialCardResponseDTO> findSpecialCardById(@PathVariable long id) {
        SpecialCardResponseDTO specialCard = specialCardService.findById(id);
        return ResponseEntity.ok(specialCard);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpecialCardResponseDTO> updateSpecialCard(@PathVariable long id,
            @Valid @RequestBody SpecialCardUpdateDTO specialCardUpdateDTO) {
        specialCardUpdateDTO.setId(id);
        SpecialCardResponseDTO updatedSpecialCard = specialCardService.update(specialCardUpdateDTO);
        return ResponseEntity.ok(updatedSpecialCard);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpecialCard(@PathVariable long id) {
        specialCardService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
