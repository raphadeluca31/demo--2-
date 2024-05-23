package com.example3333.demo.controller;

import com.example3333.demo.entidade.Cidade;
import com.example3333.demo.repository.CidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
public class CidadeController {

    @Autowired
    private CidadeRepository cidadeRepository;

    @GetMapping("/cidades")
    Iterable<Cidade> listarCidades() {
        return cidadeRepository.findAll();
    }

    @GetMapping("/cidades/{id}")
    ResponseEntity<Cidade> buscarCidade(@PathVariable Long id) {
        Optional<Cidade> cidade = cidadeRepository.findById(id);
        if (cidade.isPresent()) {
            return ResponseEntity.ok(cidade.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/cidades")
    ResponseEntity<Cidade> adicionarCidade(@RequestBody Cidade cidade) {
        Cidade novaCidade = cidadeRepository.save(cidade);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaCidade);
    }

    @PutMapping("/cidades/{id}")
    ResponseEntity<Cidade> atualizarCidade(@PathVariable Long id, @RequestBody Cidade cidade) {
        if (!cidadeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        cidade.setId(id);
        Cidade cidadeAtualizada = cidadeRepository.save(cidade);
        return ResponseEntity.ok(cidadeAtualizada);
    }

    @DeleteMapping("/cidades/{id}")
    ResponseEntity<Void> deletarCidade(@PathVariable Long id) {
        if (!cidadeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        cidadeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}