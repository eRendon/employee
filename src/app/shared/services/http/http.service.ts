import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string = 'https://ibillboard.com/api/'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'

  constructor(private httpClient: HttpClient) { }

  get<T> (endPoint?: string): Observable<T> {
    const url = this.corsAnywhereUrl + this.baseUrl + endPoint;
    return this.httpClient.get<T>(url, this.httpOptions)
  }
}
