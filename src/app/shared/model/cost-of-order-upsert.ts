export class CostOfOrderUpsert {
    constructor(public id:number, public totalNumbersOfWages:number, public priceOfWage:string, public totalNumbersOfWagesDecimalBam:string,
                public salaryPerNight: number, public priceOfFuel: number, public totalCost: string,
                public numberOfKilometers: number, public totalFuelKilometers: string, public totalFuelKilometersDecimalBam: Date, public otherCostString: Date,
                public otherCostDecimal:number, public totalCostFinish:number, public travelOrderId:number){}
}
