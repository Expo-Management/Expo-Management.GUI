import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  project_options = [
    { 
      link: 'list-project',
      icon: 'check_circle',
      text: 'Calificar Proyectos'
    },
  ]

  judges_options = [
    { 
      link: 'list',
      icon: 'assignment_ind',
      text: 'Jueces'
    },
  ]

  student_options = [
    {
      link: 'students',
      icon: 'school',
      text: 'Estudiantes'
    },
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
