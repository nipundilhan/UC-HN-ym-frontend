import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  PATH_OF_API = 'http://localhost:3000/YM';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });


  //import HttpClientModule in app.module.ts imports array
  constructor(private httpclient: HttpClient) { }

  public executePost(url: string,data: any){
    //console.log("this is the calling url " +this.PATH_OF_API +url);
    return this.httpclient.post<any>(this.PATH_OF_API +url,data);
  }

  public executePut(url: string,data: any){
    return this.httpclient.put<any>(this.PATH_OF_API +url,data);
  }


  public executeGet(url: string){
    return this.httpclient.get<any>(this.PATH_OF_API +url);
  }

  public executePostNoAuth(url: string,data: any){
    return this.httpclient.post<any>(this.PATH_OF_API + url, data, {
      headers: this.requestHeader,
    });
  }

  public executePutNoAuth(url: string,data: any){
    return this.httpclient.put<any>(this.PATH_OF_API + url, data, {
      headers: this.requestHeader,
    });
  }


  public executeGetNoAuth(url: string){
    return this.httpclient.get<any>(this.PATH_OF_API +url, {
      headers: this.requestHeader,
    });
  }

}
