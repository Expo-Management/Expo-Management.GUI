import { Component, OnInit } from '@angular/core';

export interface Judges {
  name: string;
  date: string;
  type: string;
  size: string;

}

const ELEMENT_DATA: Judges[] = [
  { name: 'Inscripción de la Feria', date: '3/13/2022', type: 'Documento Word', size: '25 KB'},
  { name: 'Renuncia de la Feria', date: '3/13/2022', type: 'Documento Word', size: '23 KB'},
];

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'type', 'size', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
