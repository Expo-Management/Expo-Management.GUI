import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  project_admin_options = [
    { 
      link: 'project/1',
      icon: 'info',
      text: 'Detalles del proyecto'
    },
    { 
      link: 'security-protocols',
      icon: 'insert_drive_file',
      text: 'Documentacion del proyecto'
    },
  ]

  user_options = [
    { 
      link: 'security-protocols',
      icon: 'add',
      text: 'Crear Proyecto'
    },
    { 
      link: 'security-protocols',
      icon: 'group',
      text: 'Equipo de proyecto'
    },
  ]

  fair_options = [
    { 
      link: 'security-protocols',
      icon: 'more_horiz',
      text: 'Protocolos de seguridad de la feria'
    },
    { 
      link: 'past-projects',
      icon: 'arrow_back',
      text: 'Proyectos anteriores'
    },
    { 
      link: 'current-projects',
      icon: 'list',
      text: 'Lista de proyectos actuales'
    },
    { 
      link: '',
      icon: 'folder',
      text: 'Documentacion necesaria'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
