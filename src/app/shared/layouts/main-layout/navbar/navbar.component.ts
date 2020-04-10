import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarsService} from '../../../services/cars.service';
import {Car} from '../../../interfaces/car';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAlive = true;
  favorites: Car[] = [];

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    this.carsService.getFavorites().pipe(
      takeWhile(() => this.isAlive)
    ).subscribe(
      data => {
        this.favorites = [];
        data.forEach(id => {
          // console.log(id, this.carsService.getCar(id));
          this.favorites.push(this.carsService.getCar(id));
        });
      }
    );
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }

}
