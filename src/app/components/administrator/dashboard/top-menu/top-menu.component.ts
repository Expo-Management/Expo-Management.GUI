import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  user_name = 'Andres Barrantes'
  user_role = 'Admin'

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  logout(){
    this.tokenStorage.signOut();
  }
}
