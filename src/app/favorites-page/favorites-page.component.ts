import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarsService} from '../shared/services/cars.service';
import {Car} from '../shared/interfaces/car';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit, OnDestroy {
  isAlive = true;
  cars: Car[];

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    this.carsService.getFavorites().pipe(
      takeWhile(() => this.isAlive)
    ).subscribe(
      data => {
        this.cars = [];
        data.forEach(id => {
          // console.log(id, this.carsService.getCar(id));
          this.cars.push(this.carsService.getCar(id));
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
