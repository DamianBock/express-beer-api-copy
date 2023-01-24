import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getHausA(): Observable<any> {
    const url = 'http://localhost:8080/HausA';
    return this.http.get<any>(url);
  }
  public updateInteressenten(ID: any): Observable<any> {
      console.log("http://localhost:8080/InteressentenP/" + ID );
      return this.http.put("http://localhost:8080/InteressentenP/"+String(ID),{});
    }
  public createHaus(Haus:any): Observable<any>{
    console.log("http://localhost:8080/Haus");
    return this.http.post("http://localhost:8080/Haus",Haus);
  }
  public getHaus(ID:any): Observable<any>{
    console.log("http://localhost:8080/Haus/"+ID);
    return this.http.get<any>("http://localhost:8080/Haus/"+ID,{});

  }


  }
  

