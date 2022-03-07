import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [],
})
export class ProgressComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  progreso: number = 50;
  progreso1:number =40;
  leye1:string='Plabra';
  progreso2:number = 100;
  leye2:string='Frase';

/* 
  actualizar(event:number){
    
  } */
}