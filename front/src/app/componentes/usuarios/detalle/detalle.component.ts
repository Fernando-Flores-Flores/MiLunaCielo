import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../form-usuario/form-usuario.component';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  usuario: Usuario;
  id: string;
  private fotoSeleccionada: File;
  titulo = 'Detelle del cliente';
  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id: number = +params.get('id');

      if (id) {
        this.usuarioService.getUsuario(id).subscribe((user) => {
          this.usuario = user;
          console.log('===================================11111qaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa================' );
          console.log(this.usuario);
          console.log('===================================================');
        });
      }
    });



  }
  seleccionaFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }
  subirFoto() {
    console.log('===================================22222qaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa================' );
    console.log(this.usuario);
    console.log('===================================================');

    this.usuarioService
      .subirFoto(this.fotoSeleccionada, this.usuario.id)
      .subscribe((user) => {
        delay(22000);
        console.log('SSSSSSSSSSSSSSSSSSSSSSSSSs' + user);

        this.usuario = user;
        console.log(this.usuario);

        Swal.fire(
          'La foto se subio con exitos ',
          `Exito ${this.usuario}`,
          'success'
        );
      });
  }
}
