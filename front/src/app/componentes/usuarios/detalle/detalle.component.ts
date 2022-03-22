import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../form-usuario/form-usuario.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  usuario: Usuario;
  id: string;
  private fotoSeleccionada: File;
  titulo = 'Detalle del cliente';
  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id: number = +params.get('id');

      if (id) {
        this.usuarioService.getUsuario(id).subscribe((user) => {
          this.usuario = user;
        });
      }
    });
  }
  seleccionaFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }
  subirFoto() {
    this.usuarioService
      .subirFoto(this.fotoSeleccionada, this.usuario.id)
      .subscribe((user) => {
        this.usuario = user;
        Swal.fire(
          'La foto se subio con exitos ',
          `Exito ${this.usuario}`,
          'success'
        );
      });
    /*   this.router.navigate(['usuarios/ver/' + this.usuario.id]);
    console.log("Se reinicio");
 */
    window.location.reload();
  }
}
