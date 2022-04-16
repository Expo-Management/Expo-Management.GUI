import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  user_name = 'Andres Barrantes'
  user_role = 'Admin'

  constructor() { }

  ngOnInit(): void {
  }

}
