export class CostOfOrderUpsert {
    constructor(public id:number, public totalNumbersOfWages:number, public priceOfWage:number, public totalNumbersOfWagesDecimalBam:number,
                public salaryPerNight: number, public priceOfFuel: number, public totalCost: number,
                public numberOfKilometers: number, public totalFuelKilometers: number, public totalFuelKilometersDecimalBam: number, public otherCostString:string,
                public otherCostDecimal:number, public totalCostFinish:number, public travelOrderId:number){}
}
