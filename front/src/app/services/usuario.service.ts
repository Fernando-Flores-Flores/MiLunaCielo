import { UsuarioFr } from './../componentes/usuarios/form-usuario/form-usuario.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from '../interface/usuario.interfaces';
import { DatePipe, formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private urlEndPoint: string = 'http://localhost:8080/api/usuarios';
  constructor(private http: HttpClient, private router: Router) {}

  getUsuario(): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((resp) => {
        let usuarioMap = resp as Usuario[];
        return usuarioMap.map((usuarioM) => {
          usuarioM.nombre = usuarioM.nombre.toUpperCase();
          /*           usuarioM.createAt=formatDate(usuarioM.createAt, 'dd-MM-yyyy','en-US'); Fecha dia mes año */
          /* let datePipe = new DatePipe('en-US');
usuarioM.createAt== datePipe.transform(usuarioM.createAt, 'dd/MM/yyyy'); */

          return usuarioM;
        });
      })
    );
  }
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  crearUsuario(usuarioEnviar: UsuarioFr): Observable<any> {
    return this.http
      .post<any>(this.urlEndPoint, usuarioEnviar, {
        headers: this.httpHeaders,
      })
      .pipe(
        /*       map((response: any) => response.usuario as UsuarioFr), */
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  getCliente(id: number) {
    return this.http.get<UsuarioFr>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/user']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  /* Actualiza desde aqui el backend */
  updateEditar(usuarioEditar: UsuarioFr): Observable<UsuarioFr> {
    return this.http
      .put<UsuarioFr>(
        `${this.urlEndPoint}/${usuarioEditar.id}`,
        usuarioEditar,
        { headers: this.httpHeaders }
      )
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
  elimianrUsuario(id: number): Observable<UsuarioFr> {
    return this.http
      .delete<UsuarioFr>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
