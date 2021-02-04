import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../shared/model/company';
import { CompanyUpsert } from '../shared/model/company-upsert';


const _url=environment.baseUrl+'/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) { }
  
  GetAll():Observable<Company[]>
  { 
    return this.http.get<Company[]>(_url);
  }

  GetByName(name:string):Observable<Company[]>{
    return this.http.get<Company[]>(`${_url}?name=${name}`);
  }

  GetById(id:number):Observable<Company>{
    const url = `${_url}/${id}`;
    return this.http.get<Company>(url);
  }

  Add(company: CompanyUpsert): Observable<Company> {
    return this.http.post<Company>(_url, company);
  }

  Update(id:number, company: CompanyUpsert): Observable<any> {
    const url = `${_url}/${id}`;
    return this.http.put(url, company);    
  }

  Delete(id:number): Observable<Company> {
    const url = `${_url}/${id}`;
    return this.http.delete<Company>(url);
  }

}
