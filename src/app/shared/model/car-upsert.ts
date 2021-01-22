export class CarUpsert {
    constructor(public id:number, public name:string, public model:string, public numberOfRegistration:string, 
        public privateCar:boolean, public officialCar: boolean){}
}
