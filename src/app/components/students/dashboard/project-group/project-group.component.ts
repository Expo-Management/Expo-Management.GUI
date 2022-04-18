import { Component, OnInit } from '@angular/core';

export interface Students {
  name: string;
  last: string;
  email: string;
  phone: string;
}

const ELEMENT_DATA: Students[] = [
  { name: 'Andrés', last: 'Sanchez', email: 'andres.sanchez@gmail.com', phone: '888-888-888'},
  { name: 'Jafet', last: 'Mora Ugalde', email: 'jafet.mora@gmail.com', phone: '888-888-888'},
 
];

@Component({
  selector: 'app-project-group',
  templateUrl: './project-group.component.html',
  styleUrls: ['./project-group.component.css']
})
export class ProjectGroupComponent implements OnInit {
  displayedColumns: string[] = ['name', 'last', 'email', 'phone', 'actions', 'admin'];
  dataSource = ELEMENT_DATA;
  
  constructor() { }

  ngOnInit(): void {
  }

}
