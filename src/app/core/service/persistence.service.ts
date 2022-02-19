import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  public static readonly TOKEN = 'token';
  public static readonly HEADER_USER = 'HEADER_USER';
  public static readonly HEADER_LANG = 'currentLang';

  constructor() {
  }

  set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string): any {
    const value = localStorage.getItem(key);
    return value !== null ? (JSON.parse(value) || '') : null;
  }

  clear(key: string): void {
    localStorage.removeItem(key);
  }
}
