import { Component, OnInit } from '@angular/core';

export interface Errors {
  id: string;
  name: string;
  date: string;
  description: string;
}

const ELEMENT_DATA: Errors[] = [
  {id: '002', name: 'Fallo al actualizar datos', date: '04/13/2022', description: 'El estudiante Andrés Barrantes tuvo un fallo al actualizar los datos de su proyecto'},
  {id: '007', name: 'Fallo al subir calificación', date: '04/16/2022', description: 'El juez Eduardo Castillo tuvo un fallo al subir la calificación del proyecto TrackerBar'},

];

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'date', 'description'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
