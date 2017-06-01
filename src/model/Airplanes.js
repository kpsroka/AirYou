/* @flow */

export type Airplane = {
  manufacturer:string,
  model:string,
  shortName:string,
  rangeKm:number,
  maxOccupancy:number,
  speedKmph:number
}

export function createAirplane(
    manufacturer:string,
    model:string,
    shortName:string,
    rangeKm:number,
    maxOccupancy:number,
    speedKmph:number)
    :Airplane {
  return {
    manufacturer: manufacturer,
    model: model,
    shortName: shortName,
    rangeKm: rangeKm,
    maxOccupancy: maxOccupancy,
    speedKmph: speedKmph
  }
}

export const AIRPLANES = [
  createAirplane("AirCart", "800", "A800", 15000, 700, 905),
  createAirplane("AirCart", "406", "A406", 14400, 440, 890),
  createAirplane("AirCart", "402", "A402", 14800, 420, 890),
  createAirplane("AirCart", "210", "A210",  5000, 220, 840),
  createAirplane("AirCart", "190", "A190",  4700, 156, 820),
  createAirplane("Borking", "7.3",  "B73", 11000, 550, 905),
  createAirplane("Borking", "6.4",  "B64", 10400, 375, 850),
  createAirplane("Borking", "4.8",  "B48", 14800, 467, 910),
  createAirplane("Borking", "3.8",  "B38",  5400, 189, 850),
  createAirplane("Borking", "3.4",  "B34",  2500, 171, 795),
  createAirplane("JetRail",   "7",  "JR7",  2700,  70, 750),
  createAirplane("JetRail",   "X",  "JRX",  2200, 100, 750),
  createAirplane("Emberer", "701", "E701",  3100,  78, 890),
  createAirplane("Emberer", "901", "E901",  3200, 106, 890),
  createAirplane("Koffern", "100", "Kf10",  3100, 107, 845),
  createAirplane("Koffern",  "70",  "Kf7",  3400,  79, 845),
];
