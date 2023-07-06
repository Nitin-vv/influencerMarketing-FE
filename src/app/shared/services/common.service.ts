import { Injectable } from '@angular/core';
import { Profile } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public userDetails = new BehaviorSubject<any>(null);

  constructor() { }


  formatNumber(value: number) {
    const suffixes = ["", "K", "M", "B"];
    const suffixNum = Math.floor(("" + value).length / 3);
    let shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toFixed(1));
    if (shortValue % 1 !== 0) {
      shortValue = Number(shortValue.toFixed(1));
    }
    return shortValue + suffixes[suffixNum];
  }

}
