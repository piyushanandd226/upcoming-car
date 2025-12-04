import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../car';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  carId: number
  car: Car
  constructor(private route: ActivatedRoute, private  _service : RegistrationService,) { }


  ngOnInit(): void {
    this.carId = this.route.snapshot.params['carId'];

    this.car = new Car();
    this._service.getCarById(this.carId).subscribe( data => {
      this.car = data;
    });
  }

}
