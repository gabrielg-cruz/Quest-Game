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

import com.quest.dto.Theme.ThemeCreateDTO;
import com.quest.dto.Theme.ThemeResponseDTO;
import com.quest.dto.Theme.ThemeUpdateDTO;
import com.quest.services.ThemeServices;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/themes")
public class ThemeController {
    private final ThemeServices themeServices;

    @Autowired
    public ThemeController(ThemeServices themeServices) {
        this.themeServices = themeServices;
    }

    @PostMapping
    public ResponseEntity<ThemeResponseDTO> createTheme(@RequestBody ThemeCreateDTO themeCreateDTO) {
        ThemeResponseDTO createdTheme = themeServices.create(themeCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTheme);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ThemeResponseDTO> updateTheme(@PathVariable long id,
            @Valid @RequestBody @NotNull ThemeUpdateDTO themeUpdateDTO) {
        themeUpdateDTO.setId(id);
        ThemeResponseDTO updatedTheme = themeServices.update(themeUpdateDTO);
        return ResponseEntity.ok(updatedTheme);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThemeResponseDTO> getThemeById(@PathVariable ThemeUpdateDTO themeUpdateDTO) {
        ThemeResponseDTO theme = themeServices.findById(themeUpdateDTO.getId());
        return ResponseEntity.ok(theme);
    }

    @GetMapping
    public ResponseEntity<List<ThemeResponseDTO>> getAllThemes() {
        List<ThemeResponseDTO> themes = themeServices.findAll();
        return ResponseEntity.ok(themes);
    }

    @GetMapping("/findByName")
    public ResponseEntity<ThemeResponseDTO> getThemeByName(@RequestBody ThemeUpdateDTO themeUpdateDTO) {
        ThemeResponseDTO theme = themeServices.findById(themeUpdateDTO.getId());
        return ResponseEntity.ok(theme);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTheme(@PathVariable long id) {
        themeServices.delete(id);
        return ResponseEntity.noContent().build();
    }

}
