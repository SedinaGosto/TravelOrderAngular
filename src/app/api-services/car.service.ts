import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../shared/model/car';
import { CarUpsert } from '../shared/model/car-upsert';


const _url=environment.baseUrl+'/Car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http: HttpClient) { }
  
  GetAll():Observable<Car[]>
  { 
    return this.http.get<Car[]>(_url);
  }

  GetByName(name:string):Observable<Car[]>{
    return this.http.get<Car[]>(`${_url}?name=${name}`);
  }

  GetById(id:number):Observable<Car>{
    const url = `${_url}/${id}`;
    return this.http.get<Car>(url);
  }

  Add(location: CarUpsert): Observable<Car> {
    return this.http.post<Car>(_url, location);
  }

  Update(id:number, car: CarUpsert): Observable<any> {
    const url = `${_url}/${id}`;
    return this.http.put(url, car);    
  }

  Delete(id:number): Observable<Car> {
    const url = `${_url}/${id}`;
    return this.http.delete<Car>(url);
  }

}