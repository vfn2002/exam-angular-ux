import { Injectable }              from '@angular/core';
import {Http, RequestOptions, Response, Headers}          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Intern} from "../models/Intern";

@Injectable()
export class InternService {

  API_URL: string = "http://angular2api2.azurewebsites.net/api/internships";

  constructor(private http: Http) { }

  getInterns(): Observable<any> {
    return this.http.get(this.API_URL)
      .map((res) => this.extractData(res))
      .catch((error) => this.handleError(error));
  }

  postIntern( intern: {} ) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.API_URL, intern, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  putIntern( intern: {}, intern_id: string ) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.API_URL + "/" + intern_id, intern, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteIntern( intern_id: string ) {
    return this.http.delete(this.API_URL + "/" + intern_id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
