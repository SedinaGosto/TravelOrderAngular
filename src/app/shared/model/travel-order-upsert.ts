export class TravelOrderUpsert {
    constructor(public id:number, public numberOfOrder:string, public reasonOfTravel:string, public descriptionOfTravel:string,
                public daysOfTravel: number, public advancePayment: number, public advancePaymentString: string,
                public restOfAdvancePayment: number, public totalHours: string, public startDate: Date, public endDate: Date,
                public totalDaysOfTravel:number, public locationId:number, public employeeId:number, public carId:number,public locationStartId:number){}
}
