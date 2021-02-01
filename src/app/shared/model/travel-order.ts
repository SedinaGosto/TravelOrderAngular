export class TravelOrder {
    id:number;
    numberOfOrder:string;
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
    carId: number;

    locationName:string;
    employeeName: string;
    typeofWork:string;
    carName: string;
    privateCar:boolean;
    officialCar:boolean;

    costOfOrder:[];

  
}

