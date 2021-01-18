import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Admin } from '../shared/model/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<Admin[]>(`${environment.baseUrl}/admin`);
  }
}