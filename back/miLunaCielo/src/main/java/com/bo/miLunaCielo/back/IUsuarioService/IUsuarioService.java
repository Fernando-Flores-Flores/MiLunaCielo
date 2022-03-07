/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.bo.miLunaCielo.back.IUsuarioService;

import com.bo.miLunaCielo.back.models.entity.Usuario;
import java.util.List;

public interface IUsuarioService {

    public List<Usuario> findAll();

    public Usuario save(Usuario usuario);

    public Usuario findById(Long id);

    public void delete(Long id);
}
