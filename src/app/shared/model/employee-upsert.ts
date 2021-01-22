export class EmployeeUpsert {
    constructor(public id:number, public name:string, public surname:string, public typeOfWork:string,
         public uniqueNumber: string, public counterNumber: number, public wage: number){}
}