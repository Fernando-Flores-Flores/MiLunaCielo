import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css'],
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress') txtProgress:ElementRef;
  constructor() {}
  @Input() progreso: number;
  @Input() leyenda: string;

  @Output() cambioValorr1: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {}

  onchance(newValor: number) {
/*     let elemhtml: any = document.getElementsByName('progreso')[0]; */


    if (newValor >= 100) {
      this.progreso = 100;
    } else if (newValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValor;
    }
   /*  elemhtml.value = this.progreso; */
   this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValorr1.emit(this.progreso);
  }

  cambioValor(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;
    this.cambioValorr1.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }
}
