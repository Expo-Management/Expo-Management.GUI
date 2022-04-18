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


  constructor() { }

  ngOnInit(): void {
  }

}
