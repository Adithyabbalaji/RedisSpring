package com.spring.webapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.io.Serializable;


@Entity
public class Product implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    private Long id;
    private String name;

    public Product() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    @Override
    public String toString() {
        return "Product{id=" + id + ", name='" + name + "'}";
    }
}
