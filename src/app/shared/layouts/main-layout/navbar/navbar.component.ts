import { Component, OnInit } from '@angular/core';
import {CarsService} from '../../../services/cars.service';
import {Car} from '../../../interfaces/car';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  favorites: Car[];

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
  }

}
