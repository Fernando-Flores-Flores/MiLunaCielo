/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.bo.miLunaCielo.back.models.dao;

import com.bo.miLunaCielo.back.models.entity.Usuario;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author Fernando
 */
public interface IUsuarioDao extends CrudRepository<Usuario, Long>{

    
}
