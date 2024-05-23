package com.example3333.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example3333.demo.entidade.Carro;

@Repository
public interface CarroRepository extends CrudRepository<Carro, Long> {

}
