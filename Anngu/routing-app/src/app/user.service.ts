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
  public incrementInteressenten(ID: any): Observable<any> {
    console.log("http://localhost:8080/InteressentenP/" + ID );
    return this.http.put("http://localhost:8080/InteressentenP/"+String(ID),{});
  }
  public decrementInteressenten(ID: any): Observable<any> {
    console.log("http://localhost:8080/InteressentenM/" + ID );
    return this.http.put("http://localhost:8080/InteressentenM/"+String(ID),{});
  }
  
  public createHaus(Haus:any): Observable<any>{
    console.log("http://localhost:8080/Haus");
    return this.http.post("http://localhost:8080/Haus",Haus);
  }
  public getHaus(ID:any): Observable<any>{
    console.log("http://localhost:8080/Haus/searchID/"+ID);
    return this.http.get<any>("http://localhost:8080/Haus/searchID/"+ID,{});
  }
  public getHausATyp(Typ:any): Observable<any>{
    console.log("http://localhost:8080/Haus/searchTyp/"+Typ);
    return this.http.get<any>("http://localhost:8080/Haus/searchTyp/"+Typ,{});
  }
  public getHausAAdresse(Adresse:any): Observable<any>{
    console.log("http://localhost:8080/Haus/searchAdresse/"+Adresse);
    return this.http.get<any>("http://localhost:8080/Haus/searchAdresse/"+Adresse,{});
  }
  public getInteressenten(ID:any): Observable<any>{
    console.log("http://localhost:8080/Haus/Interesenten/"+ID);
    return this.http.get<any>("http://localhost:8080/Haus/Interessenten/"+ID,{});
  }
  
}