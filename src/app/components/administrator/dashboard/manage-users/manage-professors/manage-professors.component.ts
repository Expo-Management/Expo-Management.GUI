import { Component, OnInit } from '@angular/core';

export interface Professors {
  name: string;
  last: string;
  email: string;
  phone: string;
  subject: string;
}

const ELEMENT_DATA: Professors[] = [
  { name: 'Andrés', last: 'Bolaños', email: 'andres.bolaños@gmail.com', phone: '888-888-888', subject: 'Redes'},
  { name: 'Jafet', last: 'Mora Ugalde', email: 'jafet.mora@gmail.com', phone: '888-888-888', subject: 'Programación'},
 
];

@Component({
  selector: 'app-manage-professors',
  templateUrl: './manage-professors.component.html',
  styleUrls: ['./manage-professors.component.css']
})
export class ManageProfessorsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'last', 'email', 'phone', 'subject', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  
  dialogDelete(msg: string ): void{
    if(confirm("Are you sure to delete "+msg)) {
    }
  }

  ngOnInit(): void {
  }

  
}
