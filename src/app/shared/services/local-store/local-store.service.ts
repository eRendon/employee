import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {
  setData<T> (key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data))
  }

  getData<T> (key: string): T | null {
    const data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data)
    }
    return  null
  }
}
