import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationUpsert } from '../shared/model/location-upsert';
import { Location } from '../shared/model/location';


const _url=environment.baseUrl+'/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }
  
  GetAll():Observable<Location[]>
  { 
    return this.http.get<Location[]>(_url);
  }

  GetByName(name:string):Observable<Location[]>{
    return this.http.get<Location[]>(`${_url}?name=${name}`);
  }

  GetById(id:number):Observable<Location>{
    const url = `${_url}/${id}`;
    return this.http.get<Location>(url);
  }

  Add(location: LocationUpsert): Observable<Location> {
    return this.http.post<Location>(_url, location);
  }

  Update(id:number, location: LocationUpsert): Observable<any> {
    const url = `${_url}/${id}`;
    return this.http.put(url, location);    
  }

  Delete(id:number): Observable<Location> {
    const url = `${_url}/${id}`;
    return this.http.delete<Location>(url);
  }

}