import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interface/usuario.interfaces';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioFr } from './form-usuario/form-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [
    /*     {
      id: 1,
      nombre: 'Marcos',
      apePaterno: 'Sevilla',
      apeMaterno: 'Sevilla',
      email: 'nassflores1@gmail.com',
    },
    {
      id: 2,
      nombre: 'Fernando',
      apePaterno: 'Padilla',
      apeMaterno: 'Sevilla',
      email: 'nassflores2@gmail.com',
    },
    {
      id: 3,
      nombre: 'Josue',
      apePaterno: 'Flores',
      apeMaterno: 'Sevilla',
      email: 'nassflores3@gmail.com',
    },
    {
      id: 4,
      nombre: 'Pedro',
      apePaterno: 'Torrez',
      apeMaterno: 'Sevilla',
      email: 'nassflores4@gmail.com',
    },
    {
      id: 5,
      nombre: 'Mamani',
      apePaterno: 'UmiÃ±a',
      apeMaterno: 'Sevilla',
      email: 'nassflores5@gmail.com',
    },
    {
      id: 6,
      nombre: 'Joel',
      apePaterno: 'Quispe',
      apeMaterno: 'Sevilla',
      email: 'nassflores6@gmail.com',
    },
    {
      id: 7,
      nombre: 'Juan',
      apePaterno: 'Vargas',
      apeMaterno: 'Sevilla',
      email: 'nassflores7@gmail.com',
    },
    {
      id: 8,
      nombre: 'Pablo',
      apePaterno: 'Mandalorian',
      apeMaterno: 'Sevilla',
      email: 'nassflores8@gmail.com',
    },
    {
      id: 9,
      nombre: 'Coco',
      apePaterno: 'Chuy',
      apeMaterno: 'Sevilla',
      email: 'nassflores9@gmail.com',
    }, */
  ];
  constructor(private UsuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.UsuarioService.getUsuario().subscribe((usuario) => {
      this.usuarios = usuario;
      console.log(usuario);
    });
  }

  delete(usuario: UsuarioFr): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Esta seguro?',
        text: `Seguro que desea eliminar al cliente ${usuario.nombre} ${usuario.apePaterno}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then((result) => {

        if (result.value) {
          this.UsuarioService.elimianrUsuario(usuario.id).subscribe(
            (response) => {
              this.usuarios = this.usuarios.filter((cli) => cli !== usuario);
              swalWithBootstrapButtons.fire(
                'Usuario eliminado!',
                `Usuario ${usuario.nombre} eliminado con exito!`,
                'success'
              );
            }
          );
        }
      });
  }
}
