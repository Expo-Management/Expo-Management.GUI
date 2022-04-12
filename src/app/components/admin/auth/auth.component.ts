import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  title: string = 'Welcome'
  tryingLoggin: boolean = true;
  show_register: boolean = false;
  signUpButton: any;
  signInButton: any;

  constructor() { }

  ngOnInit(): void {
    this.signUpButton = document.getElementById("sign-up-link");
    this.signInButton = document.getElementById("sign-in-link");

    this.signUpButton.addEventListener("click", () => {
      this.show_register = true;
      this.title = 'Create your account in a simple way!'
    });

    this.signInButton.addEventListener("click", () => {
      this.show_register = false;
      this.title = 'Welcome to Expo Engineering App'
    });
  }}
