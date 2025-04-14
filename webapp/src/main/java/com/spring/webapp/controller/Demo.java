package com.spring.webapp.controller;

import com.spring.webapp.entity.Product;
import com.spring.webapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.List;
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/product")
public class Demo {
    @Autowired
    ProductService productService;


    @PostMapping
    public Product save(@RequestBody Product product) {
        return productService.update(product);
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        Product product = productService.getProduct(id);
        System.out.println("Returned product: " + product);
        return product;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getProducts() {
        List<Product> list = productService.getProducts();
        return ResponseEntity.ok(list);

    }


}
