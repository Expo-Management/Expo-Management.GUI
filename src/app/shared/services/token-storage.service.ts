import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-token'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public signOut(): void {
    localStorage.clear();
    window.location.reload();
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

  public refreshTokens(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}