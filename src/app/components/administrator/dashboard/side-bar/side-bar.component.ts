import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  user_options = [
    { 
      icon: 'supervised_user_circle',
      text: 'Profesores',
      link: 'manage-professors',
    },
    { 
      icon: 'assignment_ind',
      text: 'Jueces',
      link: 'manage-judges',
    },
    { 
      icon: 'school',
      text: 'Estudiantes',
      link: 'manage-students',
    },
  ]

  fair_options = [
    { 
      icon: 'assignment',
      text: 'Documentos de la feria',
      link: 'fair-documents',
    },
    { 
      icon: 'calendar_today',
      text: 'Calendario de la feria',
      link: 'fair-calendar',
    },
  ]

  general_options = [
    { 
      icon: 'home',
      text: 'Principal',
      link: 'content',
    },
    { 
      icon: 'info',
      text: 'Bitacora del sistema',
      link: 'logs',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
