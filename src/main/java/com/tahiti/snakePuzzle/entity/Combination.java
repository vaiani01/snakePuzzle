package com.tahiti.snakePuzzle.entity;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Combination")
public class Combination {
    private @Id @GeneratedValue Long id;

    @Column(name = "numbers", nullable = false, unique = true)
    private String numbers;

    public Combination() {
    }

    public Combination(String numbers) {
        this.numbers = numbers;
    }

    public Combination(Long id, String numbers) {
        this.id = id;
        this.numbers = numbers;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumbers() {
        return this.numbers;
    }

    public void setNumbers(String numbers) {
        this.numbers = numbers;
    }

    public Combination id(Long id) {
        setId(id);
        return this;
    }

    public Combination numbers(String numbers) {
        setNumbers(numbers);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Combination)) {
            return false;
        }
        Combination combination = (Combination) o;
        return Objects.equals(id, combination.id) && Objects.equals(numbers, combination.numbers);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, numbers);
    }

    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", numbers='" + getNumbers() + "'" +
                "}";
    }

}
