package com.example3333.demo.controller;

import com.example3333.demo.entidade.Carro;
import com.example3333.demo.repository.CarroRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carros")
public class CarroController {

    @Autowired
    private CarroRepository carroRepository;

    // Criação de um novo carro
    @PostMapping
    public ResponseEntity<Carro> createCarro(@RequestBody Carro carro) {
        try {
            Carro savedCarro = carroRepository.save(carro);
            return ResponseEntity.ok(savedCarro);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Listagem de todos os carros
    @GetMapping
    public List<Carro> getAllCarros() {
        return (List<Carro>) carroRepository.findAll();
    }

    // Busca de um carro por ID
    @GetMapping("/{id}")
    public ResponseEntity<Carro> getCarroById(@PathVariable Long id) {
        return carroRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Atualização de um carro
    @PutMapping("/{id}")
    public ResponseEntity<Carro> updateCarro(@PathVariable Long id, @RequestBody Carro carroDetails) {
        return carroRepository.findById(id)
                .map(carro -> {
                    carro.setModelo(carroDetails.getModelo());
                    carro.setMarca(carroDetails.getMarca());
                    carro.setAno(carroDetails.getAno());
                    carro.setCategoria(carroDetails.getCategoria());
                    Carro updatedCarro = carroRepository.save(carro);
                    return ResponseEntity.ok(updatedCarro);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarro(@PathVariable Long id) {
        if (!carroRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        carroRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
