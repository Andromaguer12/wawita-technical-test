import { Bus } from './buses';

export interface BusRoute {
  id: string;
  origin: string;
  destiny: string;
  price: number;
  startTime: Date;
  arriveTime: Date;
  initialPoint?: string;
  finalPoint?: string;
  buses: Bus[];
}
