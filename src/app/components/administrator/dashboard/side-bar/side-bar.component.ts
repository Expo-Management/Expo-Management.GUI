import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  user_options = [
    { 
      icon: 'account_circle',
      text: 'Profesores',
      link: 'manage-professors"',
    },
    { 
      icon: 'account_circle',
      text: 'Jueces',
      link: '/administrator/manage-judges"',
    },
    { 
      icon: 'account_circle',
      text: 'Estudiantes',
      link: '/administrator/manage-students"',
    },
  ]

  fair_options = [
    { 
      icon: 'assignment',
      text: 'Documentos de la feria',
      link: '/administrator/fair-documents"',
    },
    { 
      icon: 'calendar_today',
      text: 'Calendario de la feria',
      link: '/administrator/fair-calendar"',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
