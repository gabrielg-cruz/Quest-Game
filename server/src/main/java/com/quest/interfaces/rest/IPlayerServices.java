package com.quest.interfaces.rest;

import java.math.BigDecimal;
import java.util.List;

import com.quest.dto.rest.Player.PlayerCreateDTO;
import com.quest.dto.rest.Player.PlayerResponseDTO;
import com.quest.dto.rest.Player.PlayerUpdateDTO;
import com.quest.dto.rest.Theme.ThemeResponseDTO;
import com.quest.models.Player;

public interface IPlayerServices {

    long count();

    PlayerResponseDTO addBalance(long id, BigDecimal amount);

    PlayerResponseDTO decreaseBalance(long id, BigDecimal amount);

    Player findPlayerById(long id);

    List<ThemeResponseDTO> findPlayerThemes(Long id);

    PlayerResponseDTO create(PlayerCreateDTO playerCreateDTO);

    PlayerResponseDTO findById(long id);

    void deletePlayerById(long id);

    void addTheme(Long playerId, Long themeId, BigDecimal balance);

    PlayerResponseDTO update(PlayerUpdateDTO playerUpdateDTO);

    PlayerResponseDTO findByName(String name);

    PlayerResponseDTO findByEmail(String email);

    List<PlayerResponseDTO> findAll();
}
