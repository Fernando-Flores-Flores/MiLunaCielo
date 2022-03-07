import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private router: Router) {
  }



  listaFormaIdentificacion: Array<any> = [
    {
      nom: 'NIT',
      value: '1',
    },
    {
      nom: 'CUA',
      value: '2',
    },
    {
      nom: 'CI',
      value: '3',
    },
    {
      nom: 'RUN',
      value: '4',
    },
    {
      nom: 'CE',
      value: '5',
    },
    {
      nom: 'PAS',
      value: '6',
    },
    {
      nom: 'RUC',
      value: '7',
    },
    {
      nom: 'SUP',
      value: '8',
    },
    {
      nom: 'GOB',
      value: '9',
    },
  ];

/* 
  get formaDeidentificacionValido() {
    return (
      this.formLogin.get('formaIdentificacion')?.touched &&
      this.formLogin.get('formaIdentificacion')?.valid
    );
  }
  get nroIdentificacionValido() {
    return (
      this.formLogin.get('nroIdentificacion')?.touched &&
      this.formLogin.get('nroIdentificacion')?.valid
    );
  }
  get passwordValido() {
    return (
      this.formLogin.get('password')?.touched &&
      this.formLogin.get('password')?.valid
    );
  }

  get formaIdentificacionInvalido() {
    return (
      this.formLogin.get('formaIdentificacion')?.touched &&
      this.formLogin.get('formaIdentificacion')?.invalid
    );
  }
  get nroIdentificacionInvalido() {
    return (
      this.formLogin.get('nroIdentificacion')?.touched &&
      this.formLogin.get('nroIdentificacion')?.invalid
    );
  }
  get passwordInvalido() {
    return (
      this.formLogin.get('password')?.touched &&
      this.formLogin.get('password')?.invalid
    );
  } */
}
