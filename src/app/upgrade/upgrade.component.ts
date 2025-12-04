import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../car';
import { Imagemodel } from '../imagemodel';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  imagemodel=new Imagemodel();
  msg='';
  carId: number;
  car: Car = new Car();
  constructor(private  _service : RegistrationService, private _route : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.carId= this.route.snapshot.params['carId'];

    this._service.getCarById(this.carId).subscribe(data => {
      this.car= data;
    }, error => console.log(error));
  }

  onSubmit(){
    this._service.updateCar(this.carId, this.car).subscribe( data =>{
      this.goToCarList();
    }
    , error => console.log(error));
  }

  goToCarList(){
    this._route.navigate(['/table-list']);
  }

}














