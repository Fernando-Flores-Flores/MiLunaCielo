import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../interface/usuario.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css'],
})
export class FormUsuarioComponent implements OnInit {
  titulo: string = 'Crear usuarios';
  usuarioFront: Usuario = new UsuarioFr();
  public errores: string[];
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarClienteEnPantalla();
  }
  res: any;
  create(): void {
    this.usuarioService.crearUsuario(this.usuarioFront).subscribe(
      (json) => {
        this.router.navigate(['/user']);
        console.log(json);

        Swal.fire(
          'Nuevo usuario ',
          `Clientes ${json.mensaje}   ${json.user}creado con éxito!`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error(err.error.errors);
        console.error('Código del error desde el backend: ' + err.status);
      }
    );
  }

  cargarClienteEnPantalla(): void {
    this.activatedRoute.params.subscribe((parametros) => {
      let id = parametros['id'];
      if (id) {
        this.usuarioService.getCliente(id).subscribe((responseUsuario) => {
          this.usuarioFront = responseUsuario;
        });
      }
    });
  }

  actualizar(): void {
    this.usuarioService.updateEditar(this.usuarioFront).subscribe(
      (response) => {
        this.router.navigate(['/user']);
        Swal.fire(
          'Usuario actualizado',
          `Usuario ${response.nombre} actualizado con exito!`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error(err.error.errors);
        console.error('Código del error desde el backend: ' + err.status);
      }
    );
  }
}
export class UsuarioFr {
  id: number;
  nombre: string;
  apePaterno: string;
  apeMaterno: string;
  email: string;
}
