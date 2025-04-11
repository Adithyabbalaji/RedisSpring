package com.spring.webapp.controller;

import com.spring.webapp.entity.Product;
import com.spring.webapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;

@RestController
@RequestMapping("/product")
public class Demo {
    @Autowired
    ProductService productService;

//    @RequestMapping("/{id}")
//    public Product get(@PathVariable("id") Long id){
//        return productService.getProduct(id);
//    }
    @PostMapping
    public Product save(@RequestBody Product product){
        return productService.update(product);
    }
//    @RequestMapping("/1")
//    public Product get1(){
//        Product p = new Product(1L,"Bed");
//        Product prod = productService.update(p);
//        //System.out.println(a.getName());
//        System.out.println("Returned product: " + prod.getName());
//        return prod;
//
//    }
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        Product product = productService.getProduct(id);
        System.out.println("Returned product: " + product);
        return product;
    }



}
