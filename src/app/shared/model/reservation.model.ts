import { Boat } from './boat.model';
import { Guest } from './guest.model';

export class Reservation {
  public boat: Boat;
  public guest: Guest;
  public startTime: string;
  public endTime: string;
  public numberOfPersons: string;
}
