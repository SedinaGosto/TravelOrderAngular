import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/api-services/company.service';
import { CompanyUpsert } from 'src/app/shared/model/company-upsert';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

 
  constructor(private router: Router, private route: ActivatedRoute, private _companyService:CompanyService) { }

  editMode = false;

  @ViewChild('companyForm') public companyFrm: NgForm;
  companyId:number;
  
  ngOnInit(): void {

    if (this.route.snapshot.params['id']){
      this.editMode = true;
      this.companyId = this.route.snapshot.params['id'];
      
      this.initForm();
    }

  }


  onSubmit(){
    if (!this.companyFrm.valid) 
      return;
    var company = new CompanyUpsert(0,this.companyFrm.value.name, this.companyFrm.value.idNumber, this.companyFrm.value.adress,
                  this.companyFrm.value.city, this.companyFrm.value.priceOfFuel);
    if (this.editMode){
      this._companyService.Update(this.companyId, company).subscribe(data=>{
        this.router.navigate(['app/company']);
      })    
    } 
    else{     
      this._companyService.Add(company).subscribe(data=>{
        this.router.navigate(['app/company']);
      })
    } 

  }

  private initForm(){
    this.companyFrm=new NgForm([],[]);
    this._companyService.GetById(this.companyId).subscribe(o=>{
      this.companyFrm.controls['name'].setValue(o.name),
      this.companyFrm.controls['idNumber'].setValue(o.idnumber),
      this.companyFrm.controls['adress'].setValue(o.adress);
      this.companyFrm.controls['city'].setValue(o.city);
      this.companyFrm.controls['priceOfFuel'].setValue(o.priceOfFuel);
  
    });
  }

}
