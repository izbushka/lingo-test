import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarsService} from '../shared/services/cars.service';
import {Car} from '../shared/interfaces/car';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  isAlive = true;
  cars: Car[] = [];

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    this.carsService.getCars()
      .subscribe(data => {
        this.cars = data;
      });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
