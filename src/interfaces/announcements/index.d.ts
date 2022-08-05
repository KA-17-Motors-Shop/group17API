export interface ICreateAnnouncement {
  title: string;
  description: string;
  year: number;
  km: number;
  price: float;
  isActive: boolean;
  type: type;
  typeVehicle: typeVehicle;
  limitDate: string;
}

enum type {
  auction = "auction",
  sale = "sale",
}

enum typeVehicle {
  car = "car",
  motocycle = "motocycle",
}
