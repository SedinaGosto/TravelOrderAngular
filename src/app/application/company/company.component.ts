import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/api-services/company.service';
import { Company } from 'src/app/shared/model/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor( private _companyService: CompanyService, private router: Router) { }

  company=[];
  name= '';
 

  ngOnInit(): void {
    if(this.company.length>0){
      this.company=[];
    }
    this.GetAll();
  }

  GetAll():void{
    this._companyService.GetAll()
    .subscribe(data => {this.company = data
    console.log(data)});
  }

  delete(company:Company): void {
    this._companyService.Delete(company.id).subscribe(company => {
      this.ngOnInit();    
    });
  }

 

}
