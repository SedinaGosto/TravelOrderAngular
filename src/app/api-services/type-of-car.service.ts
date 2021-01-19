import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeOfCar } from '../shared/model/type-of-car';
import { TypeOfCarUpsert } from '../shared/model/type-of-car-upsert';


const _url=environment.baseUrl+'/TypeOfCar';

@Injectable({
  providedIn: 'root'
})
export class TypeOfCarService {
  constructor(private http: HttpClient) { }
  
  GetAll():Observable<TypeOfCar[]>
  { 
    return this.http.get<TypeOfCar[]>(_url);
  }

  GetByName(name:string):Observable<TypeOfCar[]>{
    return this.http.get<TypeOfCar[]>(`${_url}?name=${name}`);
  }

  GetById(id:number):Observable<TypeOfCar>{
    const url = `${_url}/${id}`;
    return this.http.get<TypeOfCar>(url);
  }

  Add(location: TypeOfCarUpsert): Observable<TypeOfCar> {
    return this.http.post<TypeOfCar>(_url, location);
  }

  Update(id:number, typeOfCar: TypeOfCarUpsert): Observable<any> {
    const url = `${_url}/${id}`;
    return this.http.put(url, typeOfCar);    
  }

  Delete(id:number): Observable<TypeOfCar> {
    const url = `${_url}/${id}`;
    return this.http.delete<TypeOfCar>(url);
  }

}