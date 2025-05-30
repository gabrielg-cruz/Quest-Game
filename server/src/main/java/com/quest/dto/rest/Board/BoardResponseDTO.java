package com.quest.dto.rest.Board;

import java.util.List;

import com.quest.dto.rest.tile.TileResponseDTO;

public class BoardResponseDTO {
    private Long id;
    private String name;
    private int rows;
    private int cols;
    private List<TileResponseDTO> tiles;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public int getCols() {
        return cols;
    }

    public void setCols(int cols) {
        this.cols = cols;
    }

    public List<TileResponseDTO> getTiles() {
        return tiles;
    }

    public void setTiles(List<TileResponseDTO> tiles) {
        this.tiles = tiles;
    }
}
