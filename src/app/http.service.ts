import { Http, Headers, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class HttpService {

  constructor(private http: Http) {}

  // JSON mit korrekten Userdaten
  getUser() {
    return this.http.get('./assets/user.json')
    .catch( error => {
      console.error('Request failed!');
      return Observable.throw(error);
    })
    .map((response: Response) => {
      const data = response.json();
      return data;
    });
  }

}
