import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TravelOrder } from '../shared/model/travel-order';
import { TravelOrderUpsert } from '../shared/model/travel-order-upsert';


const _url=environment.baseUrl+'/TravelOrder';

@Injectable({
  providedIn: 'root'
})
export class TravelOrderService {

  constructor(private http:HttpClient) { }

  GetAll():Observable<TravelOrder[]>
  { 
    return this.http.get<TravelOrder[]>(_url);
  }

  GetById(id:number):Observable<TravelOrder>{
    const url = `${_url}/${id}`;
    return this.http.get<TravelOrder>(url);
  }

  Add(travelOrder: TravelOrderUpsert): Observable<TravelOrder> {
    return this.http.post<TravelOrder>(_url, travelOrder);
  }

  Update(id:number, travelOrder: TravelOrderUpsert): Observable<any> {
    const url = `${_url}/${id}`;
    return this.http.put(url, travelOrder);    
  }

}
