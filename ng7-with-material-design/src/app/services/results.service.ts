import 'rxjs/Rx';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IResults } from '../model/results';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  BASE_URL:string = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  public getResults(id: number): Observable<IResults[]> {
    console.log('Getting data for %d ', id);
    const url = this.BASE_URL + '/results/' + id;
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json'
      , 'UserID': 'application-ui'
    });
     /* this._http.get<Results[]>(url, {headers: headers,
      params: new HttpParams()
      .set('indices', indices.toString())
    }); */ 
    return Observable.of(id ? DUMMY_RESULTS.filter(r => r.id === id) : DUMMY_RESULTS);

  }
}


const DUMMY_RESULTS: IResults[] =
[
  {id: 101, name: 'Abhay Kumar', department: 'Engg', doj: '2020-01-01', city: 'Delhi'},
  {id: 102, name: 'Anil Kumar', department: 'Engg', doj: '2020-01-01', city: 'Delhi'},
  {id: 104, name: 'Birendra Singh', department: 'Engg', doj: '2020-01-01', city: 'Noida'},
  {id: 105, name: 'Harsh Vardhan', department: 'Engg', doj: '2020-01-01', city: 'Noida'},
  {id: 106, name: 'Kapil Varshney', department: 'Engg', doj: '2020-01-01', city: 'Mumbai'},
  {id: 107, name: 'Kumar Ketan', department: 'Engg', doj: '2020-01-01', city: 'Mumbai'},
  {id: 108, name: 'Saurabh Gupta', department: 'Engg', doj: '2020-01-01', city: 'Delhi'},
  {id: 109, name: 'Saurabh Gupta 1', department: 'Engg', doj: '2020-01-01', city: 'Mumbai'},
  {id: 1011, name: 'Sachin Bindal', department: 'Engg', doj: '2020-01-01', city: 'Hyderabad'},
  {id: 1012, name: 'Jai Jaiswal', department: 'Engg', doj: '2020-01-01', city: 'Hyderabad'},
  {id: 1013, name: 'Zoe Gupta', department: 'Engg', doj: '2020-01-01', city: 'Hyderabad'},
];
