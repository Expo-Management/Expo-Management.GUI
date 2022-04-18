import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  user_options = [
    { 
      link: 'list-project',
      icon: 'check_circle',
      text: 'Calificar Proyectos'
    },
    { 
      link: 'list',
      icon: 'account_circle',
      text: 'Jueces'
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
