import { Usuario } from './../componentes/usuarios/form-usuario/form-usuario.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private urlEndPoint: string = 'http://localhost:8080/api/usuarios';
  constructor(private http: HttpClient, private router: Router) {}

  getUsuarios(page: number): Observable<Usuario[]> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('Tap 1');
        (response.content as Usuario[]).forEach((usu) => {
          console.log(usu.nombre);
        });
      }),
      map((resp: any) => {
        (resp.content as Usuario[]).map((usuarioM) => {
          usuarioM.nombre = usuarioM.nombre.toUpperCase();
          /*           usuarioM.createAt=formatDate(usuarioM.createAt, 'dd-MM-yyyy','en-US'); Fecha dia mes año */
          /* let datePipe = new DatePipe('en-US');
usuarioM.createAt== datePipe.transform(usuarioM.createAt, 'dd/MM/yyyy'); */

          return usuarioM;
        });
        return resp;
      }),
      tap((response: any) => {
        console.log('Tap 2');
        (response.content as Usuario[]).forEach((usu) => {
          console.log(usu.nombre);
        });
      })
    );
  }
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  crearUsuario(usuarioEnviar: Usuario): Observable<any> {
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

  getUsuario(id: number) {
    /*     return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe( */
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/user']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  /* Actualiza desde aqui el backend */
  updateEditar(usuarioEditar: Usuario): Observable<Usuario> {
    return this.http
      .put<Usuario>(`${this.urlEndPoint}/${usuarioEditar.id}`, usuarioEditar, {
        headers: this.httpHeaders,
      })
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
  elimianrUsuario(id: number): Observable<Usuario> {
    return this.http
      .delete<Usuario>(`${this.urlEndPoint}/${id}`, {
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

  subirFoto(archivo: File, id: any): Observable<any> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    return this.http.post(`${this.urlEndPoint}/upload/`, formData).pipe(
      map((resp: any) => {
        resp.usuario as Usuario;
        console.log('====================aaaaaaaaaaaaaaaa===================');
        console.log(resp.usuario);

        console.log('======================aaaaaaaaaaaaaaaa=================');
      }),
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
}
