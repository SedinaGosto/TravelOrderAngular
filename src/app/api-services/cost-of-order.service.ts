import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CostOfOrder } from '../shared/model/cost-of-order';
import { CostOfOrderUpsert } from '../shared/model/cost-of-order-upsert';

const _url=environment.baseUrl+'/CostOfOrder';

@Injectable({
  providedIn: 'root'
})
export class CostOfOrderService {

  constructor(private http:HttpClient) { }

  GetAll():Observable<CostOfOrder[]>
  { 
    return this.http.get<CostOfOrder[]>(_url);
  }

  GetById(id:number):Observable<CostOfOrder>{
    const url = `${_url}/${id}`;
    return this.http.get<CostOfOrder>(url);
  }

  Add(costOfOrder: CostOfOrderUpsert): Observable<CostOfOrder> {
    return this.http.post<CostOfOrder>(_url, costOfOrder);
  }

  Update(id:number, costOfOrder: CostOfOrderUpsert): Observable<any> {
    const url = `${_url}/${id}`;
    return this.http.put(url, costOfOrder);    
  }

}
