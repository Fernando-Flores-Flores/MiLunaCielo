package com.bo.miLunaCielo.back.controlers;

import com.bo.miLunaCielo.back.IUsuarioService.IUsuarioService;
import com.bo.miLunaCielo.back.models.entity.Usuario;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")

public class UsuarioRestController {

    @Autowired
    private IUsuarioService usuarioService;

    //================================================================================================== LISTAR USUARIOS
    @GetMapping("/usuarios")
    public List<Usuario> index() {
        return usuarioService.findAll();
    }

    //==================================================================================================MOSTRAR USUARIO POR ID
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        Usuario usuario = null;
        Map<String, Object> response = new HashMap<>();
        try {
            usuario = this.usuarioService.findById(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos!");
            response.put("error", e.getMessage().concat(" : ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Not found es 404

        }

        if (usuario == null) {
            response.put("mensaje", "El usuario ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);//Not found es 404
        }
        return new ResponseEntity(usuario, HttpStatus.OK);//Ok es de tipo 200

    }

    //=============================================================================================== CREAR USUARIO ===================
  //  @ResponseStatus(HttpStatus.CREATED)
   // Para validar el  @NotEmpty @Email se inyecta @Valid , y BindingResult tiene todos los mensajes de los errores recibidos
    @PostMapping("/usuarios")
    public ResponseEntity<?> create(@Valid @RequestBody Usuario usuario, BindingResult result) {
        Usuario usuarioNew = null;
        Map<String, Object> response = new HashMap<>();
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
                    .collect(Collectors.toList());

            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }
        try {
            usuarioNew = usuarioService.save(usuario);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar el insert en la base de datos");
            response.put("error", e.getMessage().concat(" : ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Not found es 404
        }
        response.put("mensaje", "El cliente ha sido creado con éxito!!");
        response.put("user ", usuarioNew);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }
//    @PostMapping("/usuarios")
//    public ResponseEntity<?> create(@Valid @RequestBody Usuario usuario, BindingResult result) {
//
//        Usuario usuarioNew = null;
//        Map<String, Object> response = new HashMap<>();
//
//        if (result.hasErrors()) {
//
//            List<String> errors = result.getFieldErrors()
//                    .stream()
//                    .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
//                    .collect(Collectors.toList());
//
//            response.put("errors", errors);
//            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
//        }
//
//        try {
//            usuarioNew = usuarioService.save(usuario);
//        } catch (DataAccessException e) {
//            response.put("mensaje", "Error al realizar el insert en la base de datos");
//            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
//            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//
//        response.put("mensaje", "El usuario ha sido creado con éxito!");
//        response.put("usuario", usuarioNew);
//        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
//    }

    //=============================================================================================== ACTUALIZAR ===============//
    @PutMapping("/usuarios/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Usuario usuarioRecibido, BindingResult result, @PathVariable Long id
    ) {
        Usuario usuarioActual = this.usuarioService.findById(id);
        Usuario usuarioUpdate = null;
        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {
            List<String> errores = result.getFieldErrors().stream()
                    .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage()).collect(Collectors.toList());
            response.put("errors", errores);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }

        if (usuarioActual == null) {
            response.put("mensaje", "Error: No se pudo editsr, el usuario ID: ".concat(id.toString().concat(" no existe en la base de datos!")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);//Not found es 404
        }
        try {
            usuarioActual.setNombre(usuarioRecibido.getNombre());
            usuarioActual.setApePaterno(usuarioRecibido.getApePaterno());
            usuarioActual.setApeMaterno(usuarioRecibido.getApeMaterno());
            usuarioActual.setEmail(usuarioRecibido.getEmail());

            usuarioUpdate = usuarioService.save(usuarioActual);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al actualizar el usuario en la base de datos");
            response.put("error", e.getMessage().concat(" : ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Not found es 404
        }
        response.put("mensaje", "El usuario ha sido actualizado con éxito!!");
        response.put("Usuario ", usuarioUpdate);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }
    //**********************************************Eliminar

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id
    ) {
        //El map sirve para enviar la respuesta del rest, error o la respiuestas
        Map<String, Object> response = new HashMap<>();
        try {
            usuarioService.delete(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar el usuario en la base de datos");
            response.put("error", e.getMessage().concat(" : ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);//Not found es 404
        }
        response.put("mensaje", "Cliente eliminado con exito!");
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
    }

}
