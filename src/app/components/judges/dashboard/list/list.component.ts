import { Component, OnInit } from '@angular/core';

export interface Jueces {
  juez: string;
  posicion: string;
  institucion: string;
  apuntes: string;
}

const ELEMENT_DATA: Jueces[] = [
  {juez: 'Andres Bolanos', posicion: 'Profesor IT', institucion: 'Mario Quiros', apuntes: 'Apuntes'},
  {juez: 'Andres Bolanos', posicion: 'Profesor IT', institucion: 'Vargas Calvo', apuntes: 'Apuntes'},
  {juez: 'Andres Bolanos', posicion: 'Profesor IT', institucion: 'Mario Quiros', apuntes: 'Apuntes'},
  {juez: 'Andres Bolanos', posicion: 'Profesor IT', institucion: 'Vargas Calvo', apuntes: 'Apuntes'},
  {juez: 'Andres Bolanos', posicion: 'Profesor IT', institucion: 'Mario Quiros', apuntes: 'Apuntes'},
  {juez: 'Andres Bolanos', posicion: 'Profesor IT', institucion: 'Vargas Calvo', apuntes: 'Apuntes'},
  {juez: 'Andres Bolanos', posicion: 'Profesor IT', institucion: 'Mario Quiros', apuntes: 'Apuntes'},
  {juez: 'Andres Bolanos', posicion: 'Profesor IT', institucion: 'Vargas Calvo', apuntes: 'Apuntes'},
  {juez: 'Andres Bolanos', posicion: 'Profesor IT', institucion: 'Mario Quiros', apuntes: 'Apuntes'},
];
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {
  displayedColumns: string[] = ['juez', 'posicion', 'institucion', 'apuntes' ];
  dataSource = ELEMENT_DATA;
                            
  constructor() { }

  ngOnInit(): void {
  }

}