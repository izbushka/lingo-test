import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Car} from '../../interfaces/car';
import {CarsService} from '../../services/cars.service';
import {takeWhile} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent implements OnInit, OnDestroy {
  isAlive = true;
  @Input() car: Car;
  favorite = false;
  class = 'list';

  constructor(
    private carsService: CarsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.class = this.route.snapshot.routeConfig.path;
    this.carsService.getFavorites().pipe(
      takeWhile(() => this.isAlive)
    ).subscribe(data => {
        this.favorite = data.indexOf(this.car.id) > -1;
    });
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  toggleFavorites(): void {
    if (this.favorite) {
      this.carsService.removeFromFavorites(this.car.id);
    } else {
      this.carsService.addToFavorites(this.car.id);
    }
  }

}
