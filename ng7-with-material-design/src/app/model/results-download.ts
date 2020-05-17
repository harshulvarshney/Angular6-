import { IResults } from './results';


export class Results implements IResults {

  id: number;
  name: string;
  department: string;
  doj: string;
  city: string;
  country: string;

  constructor(item: IResults) {
    this.id = item.id;
    this.name = item.name;
    this.department = item.department;
    this.doj = item.doj;
    this.city = item.city ? item.city : '';
  }

}