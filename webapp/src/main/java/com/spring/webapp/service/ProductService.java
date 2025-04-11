package com.spring.webapp.service;

import com.spring.webapp.entity.Product;
import com.spring.webapp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Cacheable(value = "product", key = "#id")
    public Product getProduct(Long id){
        System.out.println("Fetching from DB...");
        return productRepository.findById(id).orElse(null);
    }
    @CachePut(value = "product", key = "#product.id")
    public Product update(Product product) {
        return productRepository.save(product);
    }
}
