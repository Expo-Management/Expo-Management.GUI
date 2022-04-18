import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  user_options = [
    { 
      icon: 'check_circle',
      text: 'Calificar Proyectos'
    },
    {
      icon: 'account_circle',
      text: 'Profesores'
    },
    { 
      icon: 'account_circle',
      text: 'Jueces'
    },
    { 
      icon: 'account_circle',
      text: 'Estudiantes'
    },
  ]

  /*fair_options = [
    { 
      icon: 'assignment',
      text: 'Documentos de la feria'
    },
    { 
      icon: 'calendar_today',
      text: 'Calendario de la feria'
    }
  ]*/
  constructor() { }

  ngOnInit(): void {
  }

}
