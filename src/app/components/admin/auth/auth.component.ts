import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  title: string = 'Bienvenido a Expo Ingenieria App';
  tryingLoggin: boolean = true;
  show_register: boolean = false;
  signUpButton: any;
  signInButton: any;

  constructor() { }

  ngOnInit(): void {
    
  }}
