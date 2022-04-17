import { Component, OnInit } from '@angular/core';

export interface Students {
  name: string;
  last: string;
  email: string;
  phone: string;
  project: string;
}

const ELEMENT_DATA: Students[] = [
  { name: 'Andrés', last: 'Sanchez', email: 'andres.sanchez@gmail.com', phone: '888-888-888', project: 'YakoStore'},
  { name: 'Jafet', last: 'Mora Ugalde', email: 'jafet.mora@gmail.com', phone: '888-888-888', project: 'TrackerBar'},
 
];


@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'last', 'email', 'phone', 'project', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
