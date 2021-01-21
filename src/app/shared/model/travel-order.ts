export class TravelOrder {
    id:number;
    numberOfOrder:number;
    reasonOfTravel:string;
    descriptionOfTravel:string;
    daysOfTravel: number;
    advancePayment: number;
    advancePaymentString: string;
    restOfAdvancePayment: number;
    totalHours: string;
    startDate: Date;
    endDate: Date;
    totalDaysOfTravel:number
    locationId: number; 
    employeeId: number;
    typeOfCarId: number;

    locationName:string;
    employeeName: string;
    typeOfCarName: string;
}

