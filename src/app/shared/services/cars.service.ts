import { Injectable } from '@angular/core';


import CarsMockData from '../../cars-model.json';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Car} from '../interfaces/car';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private cars$: BehaviorSubject<Car[]> = new BehaviorSubject([]);
  private favorites$: BehaviorSubject<number[]> = new BehaviorSubject([]);

  constructor() { }

  getCars(): BehaviorSubject<Car[]> {
    if (this.cars$.getValue().length === 0) {
      this._httpGetCars().subscribe(data => this.cars$.next(data));
    }
    return this.cars$;
  }

  _httpGetCars(): Observable<Car[]> {
    return of(CarsMockData).pipe(delay(1000));
  }

  getFavorites(): BehaviorSubject<number[]> {
    return this.favorites$;
  }

  addToFavorites(id: number): void {
    const list = this.favorites$.getValue();
    list.push(id);
    const distinct = list.filter((n, i) => list.indexOf(n) === i).sort();
    this.favorites$.next(distinct);
  }

  removeFromFavorites(id: number): void {
    const list = this.favorites$.getValue().filter(i => i === id);
    this.favorites$.next(list);
  }
}
