package com.bo.miLunaCielo.back.models.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Para convertir una clase entity, mapeado a una base de datos de la tabla
 * implemetar serializable
 */
//Java Persistence
@Entity
@Table(name = "usuarios")  //para mapear a la tabla de la base de datos
public class Usuario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "no puede estar vacio")
    @Size(min=3, max=12, message="el tamaño tiene que estar entre 3 y 12")
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotEmpty(message = "no puede estar vacio")
    @Column(name = "ape_paterno")
    private String apePaterno;

    @NotEmpty(message = "no puede estar vacio")
    @Column(name = "ape_materno")
    private String apeMaterno;

    @Column(name = "email", nullable = false, unique = true)
    @NotEmpty(message = "no puede estar vacio")
    @Email(message = "no es una dirección de correo bien formada")
    private String email;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApePaterno() {
        return apePaterno;
    }

    public void setApePaterno(String apePaterno) {
        this.apePaterno = apePaterno;
    }

    public String getApeMaterno() {
        return apeMaterno;
    }

    public void setApeMaterno(String apeMaterno) {
        this.apeMaterno = apeMaterno;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private static final long serialVersionUID = 1L;
}
