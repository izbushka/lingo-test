import { Injectable } from '@angular/core';


import CarsMockData from '../../cars-model.json';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Car} from '../interfaces/car';
import {delay, filter, skip, switchMapTo} from 'rxjs/operators';
import {AppStorageService} from './app-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private cars$: BehaviorSubject<Car[]> = new BehaviorSubject([]);
  private favorites$: BehaviorSubject<number[]> = new BehaviorSubject([]);

  constructor(private storage: AppStorageService) {
    const stored = this.storage.get('session', 'favorites');
    if (stored) {
      console.log('got', stored);
      this.favorites$.next(stored);
    }
    this.favorites$.pipe(
      skip(1)
    ).subscribe(data => {
      console.log('saving', data);
      this.storage.set('session', 'favorites', data);
    });
  }

  getCars(): BehaviorSubject<Car[]> {
    if (this.cars$.getValue().length === 0) { // first call -> get ajax data
      this._httpGetCars().subscribe(data => this.cars$.next(data));
    }
    return this.cars$;
  }

  getCar(id: number): Car {
    return this.cars$.getValue().filter(item => item.id === id).shift();
  }

  getFavorites(): Observable<number[]> {
    return this.cars$.pipe( // wait for cars data before returning favorites
      filter(data => !!data.length),
      switchMapTo(this.favorites$)
    );
  }

  addToFavorites(id: number): void {
    const list = this.favorites$.getValue();
    list.push(id);
    const distinct = list.filter((n, i) => list.indexOf(n) === i).sort();
    this.favorites$.next(distinct);
  }

  removeFromFavorites(id: number): void {
    const list = this.favorites$.getValue().filter(i => i !== id);
    this.favorites$.next(list);
  }

  private _httpGetCars(): Observable<Car[]> {
    return of(CarsMockData).pipe(delay(1000));
  }
}
