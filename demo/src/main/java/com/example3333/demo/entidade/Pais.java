package com.example3333.demo.entidade;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pais")
public class Pais {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "capital", nullable = false)
    private String capital;

    @Column(name = "continente", nullable = false)
    private String continente;

    @Column(name = "populacao", nullable = false)
    private long populacao;

    public Pais() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getcapital() {
        return capital;
    }

    public void setcapital(String capital) {
        this.capital = capital;
    }

    public String getContinente() {
        return continente;
    }

    public void setContinente(String continente) {
        this.continente = continente;
    }

    public long getPopulacao() {
        return populacao;
    }

    public void setPopulacao(long populacao) {
        this.populacao = populacao;
    }
}
