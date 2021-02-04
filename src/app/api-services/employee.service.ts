import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../shared/model/employee';
import { EmployeeUpsert } from '../shared/model/employee-upsert';


const _url=environment.baseUrl+"/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private http:HttpClient) { }

  GetAll():Observable<Employee[]>
  { 
    return this.http.get<Employee[]>(_url);
  }

  GetById(id:number):Observable<Employee>{
    const url = `${_url}/${id}`;
    return this.http.get<Employee>(url);
  }

  GetByName(name:string):Observable<Employee[]>{
    return this.http.get<Employee[]>(`${_url}?name=${name}`);
  }


  Add(employee: EmployeeUpsert) {
    return this.http.post(_url, employee);
  }

  Update(id:number, employee: EmployeeUpsert): Observable<any> {
    const url = `${_url}/${id}`;
    return this.http.put(url, employee);    
  }

  
  Delete(id:number): Observable<Employee> {
    const url = `${_url}/${id}`;
    return this.http.delete<Employee>(url);
  }

}