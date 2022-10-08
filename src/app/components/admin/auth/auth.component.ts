import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  route = '';
  
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.route = this.router.url
    console.log('current route'+this.route)
  }}
