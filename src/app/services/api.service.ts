import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL: string = 'http://localhost:8888/api'
  constructor(public httpClient: HttpClient) { }

  async doPost(endpoint: string, payload: any, isImage?: boolean){
    // let token: any = await this.data.getData('TOKEN');
    let headers_: any = {};
    let token = null;

    if(token){
      headers_ = { headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token })
        .set('Content-Type', 'application/json')
      }
    }

    if(!isImage){
      payload = JSON.stringify(payload);
    }

    return new Promise((resolve, reject) => {
      this.httpClient.post(this.baseURL + endpoint, payload, headers_)
      .subscribe({
        next: (response: any) => { resolve(response); },
        error: (error: any) => { reject(error); }
      })
    })
  }

  async doGet(endpoint: string, isLocal?: boolean){
    let fullURL: string = '';
    if(isLocal){
      fullURL = endpoint;
    } else { 
      fullURL = this.baseURL + endpoint;
    }

    return new Promise((resolve, reject) => {
      this.httpClient.get(fullURL)
      .subscribe({
        next: (response: any) => { resolve(response); },
        error: (error: any) => { reject(error); }
      })
    })

  }

}
