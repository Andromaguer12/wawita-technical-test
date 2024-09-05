import { BusRoute } from './routes';

export interface Bus {
  id: string;
  model: string;
  plate: string;
  capacity: number;
  routeId?: string;
  route?: BusRoute;
}
