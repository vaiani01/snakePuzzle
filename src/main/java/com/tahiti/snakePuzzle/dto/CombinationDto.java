package com.tahiti.snakePuzzle.dto;

import java.util.Objects;

public class CombinationDto {

    private Long id;

    private String combination;

    public CombinationDto() {
    }

    public CombinationDto(Long id, String combination) {
        this.id = id;
        this.combination = combination;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCombination() {
        return this.combination;
    }

    public void setCombination(String combination) {
        this.combination = combination;
    }

    public CombinationDto id(Long id) {
        setId(id);
        return this;
    }

    public CombinationDto combination(String combination) {
        setCombination(combination);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof CombinationDto)) {
            return false;
        }
        CombinationDto combinationDto = (CombinationDto) o;
        return Objects.equals(id, combinationDto.id) && Objects.equals(combination, combinationDto.combination);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, combination);
    }

    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", combination='" + getCombination() + "'" +
                "}";
    }

}
