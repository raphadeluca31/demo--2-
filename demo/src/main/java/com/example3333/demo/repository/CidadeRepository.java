package com.example3333.demo.repository;

import com.example3333.demo.entidade.Cidade;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CidadeRepository extends CrudRepository<Cidade, Long> {

}
