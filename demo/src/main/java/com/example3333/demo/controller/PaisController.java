
package com.example3333.demo.controller;

import com.example3333.demo.entidade.Pais;
import com.example3333.demo.repository.PaisRepository;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PaisController {

    @Autowired
    private PaisRepository paisRepository;

    @GetMapping("/paises")
    Iterable<Pais> listarPaises() {
        return paisRepository.findAll();
    }

    @GetMapping("/paises/{id}")
    ResponseEntity<Pais> buscarPais(@PathVariable Long id) {
        Optional<Pais> pais = paisRepository.findById(id);
        if (pais.isPresent()) {
            return ResponseEntity.ok(pais.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/paises")
    ResponseEntity<Pais> adicionarPais(@RequestBody Pais pais) {
        Pais novoPais = paisRepository.save(pais);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPais);
    }

    @PutMapping("/paises/{id}")
    ResponseEntity<Pais> atualizarPais(@PathVariable Long id, @RequestBody Pais pais) {
        if (!paisRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        pais.setId(id);
        Pais paisAtualizado = paisRepository.save(pais);
        return ResponseEntity.ok(paisAtualizado);
    }

    @DeleteMapping("/paises/{id}")
    ResponseEntity<Void> deletarPais(@PathVariable Long id) {
        if (!paisRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        paisRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}