import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  user_options = [
    { 
      link: 'new-project',
      icon: 'add',
      text: 'Crear Proyecto'
    },
    { 
      link: 'project/1',
      icon: 'info',
      text: 'Detalles del proyecto'
    },
  ]

  fair_options = [
    { 
      link: 'current-projects',
      icon: 'list',
      text: 'Lista de proyectos actuales'
    },
    { 
      link: 'project-mentions',
      icon: 'stars',
      text: 'Menciones de proyecto'
    },
    { 
      link: 'past-projects',
      icon: 'arrow_back',
      text: 'Proyectos anteriores'
    },
    { 
      link: 'fair-news',
      icon: 'new_releases',
      text: 'Noticias de la feria'
    },
  ]

  fair_documents = [
    { 
      link: 'fair-documents',
      icon: 'folder',
      text: 'Documentación necesaria'
    },
    { 
      link: 'security-protocols',
      icon: 'more_horiz',
      text: 'Protocolos de seguridad de la feria'
    },
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
