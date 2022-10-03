import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-token'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public signOut(): void {
    localStorage.clear();
  }

  public saveAccessToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
}